import {SignalController} from "@/signal/SignalController.js";
import {getModel} from "@/api/models/index.js";
import {ArticleGridController} from "@/view/crm/article/ArticleGridController.jsx";
import {capitalize} from "@/util/capitalize.js";
import {Server} from "@/api/firebase/Server.js";
import {Timestamp} from 'firebase/firestore'

function transformObject(obj) {
    // Helper function to wrap values in an array
    const wrapInArray = (value) => (Array.isArray(value) ? value : [value]);

    // Transform article_description into an array of independent objects
    const transformArticleDescription = (description) => {
        const transformed = [];
        description.forEach((item) => {
            const {name, value} = item
            if (name === 'link') {
                const link = []
                value.forEach((item) => {
                    link.push(item.value)
                })
                transformed.push({'link': link})
            } else {
                transformed.push({ [name]: wrapInArray(value)});
            }
        })
        return transformed;
    };

    // Main transformation logic
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (key === 'article_description') {
            result[key] = transformArticleDescription(value);
        } else if (key === 'article_url') {
            result[key] = wrapInArray(value);
        } else {
            if (!['article_status', 'article_title', 'article_author', 'article_summary', 'article_id', 'article_date'].includes(key)) {
                result[key] = Array.isArray(value) ? value : wrapInArray(value);
            } else {
                result[key] = value;
            }
        }
    }

    return result;
}

async function updateTagsOnArticleChange(articleTags, isAdding = true) {
    const response = await Server.getAll({
        collection: 'tags'
    })

    let { tags_count = {}, tags_active = [] , id } = response[0]

    articleTags.forEach(tag => {
        if (tags_count[tag]) {
            if (isAdding) {
                tags_count[tag] += 1;
                tags_active = new Set([...tags_active, tag]);
            } else {
                tags_count[tag] -= 1;
                if (tags_count[tag] === 0) {
                    tags_active = tags_active.filter(_tag => _tag !== tag);
                    delete tags_count[tag];
                }
            }
        } else {
            if (isAdding) {
                tags_count[tag] = 1;
                tags_active = new Set([...tags_active, tag]);
            }
        }
    });

    await Server.update({
        id,
        collection: 'tags',
        data: {
            tags_count,
            tags_active: Array.from(tags_active)
        }
    })
}

export const ArticleModalController = new SignalController({
    selectData: [
        {name: 'header', label: 'Header'},
        {name: 'enunciate', label: 'Enunciate'},
        {name: 'text', label: 'Text'},
        {name: 'link', label: 'Link'},
        {name: 'important', label: 'Important'},
        {name: 'quote', label: 'Quote'},
        {name: 'code', label: 'Code'},
    ],
    editMap: {
        article: async (articleId) => {
            let me = ArticleModalController
            // await new Promise((resolve) => setTimeout(resolve, 1000))
            // const response = await FetchApi(
            //     'articleById',
            //     'GET',
            //     null,
            //     {articleId}
            // )
            const data = await Server.getById({
                collection: 'articles',
                id: articleId
            })

            let formatDescription = data.article_description.map(item => {
                if (Object.keys(item)[0] === 'link') {
                    let link = []
                    item.link.map(i => {
                       link.push({
                           name: 'link',
                           label: 'Link',
                           value: {
                               href: i.href,
                               label: i.label,
                           }
                       })
                    })
                    return {
                        name: Object.keys(item)[0],
                        label: capitalize(Object.keys(item)[0]),
                        value: [...link]
                    }
                }
                if (Object.keys(item)[0] === 'quote') {
                    return {
                        name: Object.keys(item)[0],
                        label: capitalize(Object.keys(item)[0]),
                        value: [Object.values(item)[0][0],Object.values(item)[0][1]]
                    }
                }
                return {
                    value: Object.values(item)[0][0],
                    name: Object.keys(item)[0],
                    label: capitalize(Object.keys(item)[0])
                }
            })

            const ArticleModel = getModel('article')
            me.record = new ArticleModel({...data, article_description: formatDescription})
            me.formData = {...me.record}
        }
    },
    handlers: null
}, {
    updatePosition: (data) => {
        let me = ArticleModalController;
        me.formData.article_description = data
        // console.log(me.formData.article_description);
    },
    handleInputLink: async (data, linkIndex) => {
        let me = ArticleModalController;
        const { checkIfObjectHasKey } = await import('@/util/checkIfObjectHasKey.js');

        // Ensure `article_description` exists
        if (!checkIfObjectHasKey(me.formData, ['article_description'])) {
            me.formData.article_description = [];
        }
        me.formData.article_description[linkIndex] = {
            ...me.formData.article_description[linkIndex],
            value: data
        }

    },
    handleInput: async (name, value, type) => {
        let me = ArticleModalController;

        if (type) {
            const {checkIfObjectHasKey} = await import('@/util/checkIfObjectHasKey.js')
            if (!checkIfObjectHasKey(me.formData, ['article_description'])) me.formData.article_description = []
            me.formData = {
                ...me.formData,
                [name]: value
            }
        } else {
            me.formData = {
                ...me.formData,
                [name]: value
            }
        }

    },
    handleCreateArticle: async (id) => {
        let me = ArticleModalController,
            readyObj = transformObject(me.formData),
            date = new Date();
        readyObj.article_date = Timestamp.fromDate(date)
        if (!id) readyObj.article_status = false

        if (id) {
            await Server.update({
                id,
                collection: 'articles',
                data: readyObj
            })
            await updateTagsOnArticleChange(readyObj.article_tags)
        } else {
            await Server.create({
                collection: 'articles',
                data: readyObj,
            })
            // await updateTagsOnArticleChange(readyObj.article_tags)
        }
        //get the grid data
        ArticleGridController.fetchData()
        me.resetState()
    },
    handleDeleteArticle: async (id, articleTags) => {
        await Server.delete({
            id,
            collection: 'articles'
        })
        await updateTagsOnArticleChange(articleTags, false)
        ArticleGridController.fetchData()
    },
    tagGetData: async () => {
        let me = ArticleModalController;
        //await new Promise((resolve) => setTimeout(resolve, 1000))
        const response = await Server.getAll({
            collection: 'tags'
        })
        me.tagData = response[0].tags
        me.tagLoading = false
    },
    handleArticleStatus: async () => {
        let me = ArticleModalController,
            status = me.record.article_status,
            id = me.record.id;

        await Server.update({
            id,
            collection: 'articles',
            data: {
                article_status: !status,
            }
        })
        await updateTagsOnArticleChange(me.record.article_tags, !status)
        await me.modalData('article', id)
        //get the grid data
        ArticleGridController.fetchData()
    },
    updateSelectData: (data) => {
        ArticleModalController.selectData = data
    },
    setHandlers: (handlers) => ArticleModalController.handlers = handlers,
    addRawData: async () => {
        let obj = {
            "article_author": "@hast_maka",
            "article_like": 8,
            "article_summary": "Unlocking the Power of AI: Transforming Industries and Enhancing Human Potential",
            "article_status": true,
            "article_tags": [
                "artificial-intelligence",
                "machine-learning",
                "technology"
            ],
            "article_url": [
                "https://firebasestorage.googleapis.com/v0/b/rylllc.firebasestorage.app/o/c7f66339-466e-4413-9edd-69755a781980.jpg?alt=media&token=d548f2f5-4493-40ca-9f88-e62d72570ff3"
            ],
            "article_description": [
                {
                    "header": [
                        "The Rise of Artificial Intelligence"
                    ]
                },
                {
                    "enunciate": [
                        "Revolutionizing Industries and Shaping the Future"
                    ]
                },
                {
                    "text": [
                        "Artificial Intelligence (AI) has rapidly evolved from a futuristic concept to an integral part of our daily lives. From personalized recommendations on streaming platforms to complex decision-making in healthcare and finance, AI is transforming industries and enhancing human capabilities in ways previously unimaginable."
                    ]
                },
                {
                    "text": [
                        "In this article, we’ll explore how AI is revolutionizing various sectors, the challenges it presents, and the future it holds."
                    ]
                },
                {
                    "enunciate": [
                        "The Core of AI: Machine Learning and Deep Learning"
                    ]
                },
                {
                    "text": [
                        "At the heart of AI lies Machine Learning (ML), a subset that enables computers to learn from data and improve over time without explicit programming. Deep Learning, a more advanced form of ML, utilizes neural networks to process large datasets and make intelligent decisions, mimicking human cognitive functions."
                    ]
                },
                {
                    "code": [
                        "from sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Example: Training a simple AI model\ndata = load_data()\nX_train, X_test, y_train, y_test = train_test_split(data.features, data.labels, test_size=0.2)\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\naccuracy = model.score(X_test, y_test)\nprint(f'Accuracy: {accuracy * 100:.2f}%')"
                    ]
                },
                {
                    "enunciate": [
                        "Industries Transformed by AI"
                    ]
                },
                {
                    "text": [
                        "AI is making a significant impact across multiple industries. Let’s take a closer look at some of the key sectors benefiting from AI innovations."
                    ]
                },
                {
                    "enunciate": [
                        "🔹 Healthcare"
                    ]
                },
                {
                    "text": [
                        "AI-powered diagnostic tools can analyze medical images, detect diseases at an early stage, and provide more accurate predictions. AI also plays a role in personalized medicine, tailoring treatments based on individual genetic profiles."
                    ]
                },
                {
                    "enunciate": [
                        "🔹 Finance"
                    ]
                },
                {
                    "text": [
                        "From fraud detection to automated trading, AI is enhancing security and efficiency in financial services. Machine learning algorithms can analyze transaction patterns to identify fraudulent activities in real-time."
                    ]
                },
                {
                    "enunciate": [
                        "🔹 Retail & E-commerce"
                    ]
                },
                {
                    "text": [
                        "AI-driven recommendation systems enhance customer experience by providing personalized product suggestions. Chatbots powered by natural language processing (NLP) improve customer support by handling inquiries efficiently."
                    ]
                },
                {
                    "enunciate": [
                        "🔹 Autonomous Vehicles"
                    ]
                },
                {
                    "text": [
                        "Self-driving cars rely on AI to process sensor data, navigate roads, and make split-second decisions. Companies like Tesla and Waymo are pushing the boundaries of autonomous vehicle technology."
                    ]
                },
                {
                    "enunciate": [
                        "Challenges and Ethical Considerations"
                    ]
                },
                {
                    "text": [
                        "Despite its potential, AI poses challenges that must be addressed to ensure responsible development and deployment."
                    ]
                },
                {
                    "text": [
                        "✅ Bias and Fairness: AI models can inherit biases from training data, leading to unfair outcomes. Ongoing research aims to create more equitable algorithms."
                    ]
                },
                {
                    "text": [
                        "✅ Job Displacement: Automation driven by AI may replace certain jobs, necessitating reskilling programs to help workers transition into new roles."
                    ]
                },
                {
                    "text": [
                        "✅ Privacy Concerns: AI-powered surveillance and data collection raise concerns about personal privacy. Regulations like GDPR aim to address these issues."
                    ]
                },
                {
                    "enunciate": [
                        "The Future of AI: What Lies Ahead?"
                    ]
                },
                {
                    "text": [
                        "The AI revolution is just beginning. Future advancements will bring even more powerful capabilities, including AI-generated content, more sophisticated automation, and enhanced human-AI collaboration."
                    ]
                },
                {
                    "text": [
                        "As AI continues to evolve, its impact on society will depend on how responsibly it is developed and implemented. The key to harnessing AI’s potential lies in balancing innovation with ethical considerations."
                    ]
                },
                {
                    "quote": [
                        "Artificial Intelligence is not a threat. It is a tool that, if used wisely, can lead humanity to a new era of progress.",
                        "Unknown"
                    ]
                },
                {
                    "enunciate": [
                        "Reference"
                    ]
                },
                {
                    "link": [
                        {
                            "label": "AI Research Papers",
                            "href": "https://arxiv.org/list/cs.AI/recent"
                        }
                    ]
                }
            ],
            "article_title": "The AI Revolution: Unlocking a Smarter Future",
            "article_date": new Date()
        }
        let obj1 = {
            "article_author": "@your_username",
            "article_like": 5,
            "article_summary": "Grok 3 is revolutionizing data processing and analysis with its innovative approach, setting new benchmarks for AI-driven solutions. This article delves into the features of Grok 3, its applications, and the impact it will have on industries worldwide.",
            "article_status": true,
            "article_tags": [
                "artificial-intelligence",
                "data-processing",
                "AI-technologies"
            ],
            "article_url": [
                "https://example.com/path/to/image.jpg"
            ],
            "article_description": [
                {
                    "header": [
                        "The Rise of Grok 3"
                    ]
                },
                {
                    "text": [
                        "Artificial Intelligence (AI) has been at the forefront of technological advancements, and Grok 3 is the next step in the evolution of data processing. Grok 3 leverages deep learning and advanced algorithms to streamline data handling, providing businesses with powerful tools to make informed decisions faster and more accurately than ever before."
                    ]
                },
                {
                    "enunciate": [
                        "The Core of Grok 3: Deep Learning and Natural Language Processing"
                    ]
                },
                {
                    "text": [
                        "At the heart of Grok 3 lies cutting-edge AI technologies. Grok 3 integrates advanced Deep Learning techniques to process and analyze vast datasets quickly. By utilizing Natural Language Processing (NLP), Grok 3 allows businesses to extract valuable insights from unstructured data, making it a game-changer for data-intensive industries."
                    ]
                },
                {
                    "code": [
                        "import grok3\nfrom grok3.model import DeepLearningModel\n\n# Example: Training a Grok 3 model for data analysis\ndata = load_data('data.csv')\nmodel = DeepLearningModel()\nmodel.train(data)\npredictions = model.predict(new_data)\nprint(f'Predictions: {predictions}')"
                    ]
                },
                {
                    "enunciate": [
                        "Industries Transformed by Grok 3"
                    ]
                },
                {
                    "text": [
                        "Grok 3’s capabilities are reshaping industries, providing them with new opportunities to enhance operations and improve customer experiences."
                    ]
                },
                {
                    "enunciate": [
                        "🔹 Healthcare"
                    ]
                },
                {
                    "text": [
                        "Grok 3’s AI-driven analytics can analyze medical data, detect patterns, and help doctors with diagnosis and treatment plans. With its real-time capabilities, Grok 3 can predict patient conditions and help manage health risks more effectively."
                    ]
                },
                {
                    "enunciate": [
                        "🔹 Finance"
                    ]
                },
                {
                    "text": [
                        "AI-driven predictions and risk analysis are central to Grok 3’s impact on finance. By analyzing financial transactions, Grok 3 detects anomalies, reduces fraud, and aids in real-time decision-making, leading to smarter investments and efficient portfolio management."
                    ]
                },
                {
                    "enunciate": [
                        "🔹 E-commerce & Retail"
                    ]
                },
                {
                    "text": [
                        "Grok 3 is also revolutionizing e-commerce by enabling personalized recommendations based on customer behavior. Its NLP capabilities help improve customer service through intelligent chatbots that offer instant support."
                    ]
                },
                {
                    "enunciate": [
                        "🔹 Autonomous Systems"
                    ]
                },
                {
                    "text": [
                        "In industries such as transportation, Grok 3 is helping develop smarter, safer autonomous systems. With its advanced sensor data processing and real-time decision-making, Grok 3 is a key enabler of autonomous vehicle technology."
                    ]
                },
                {
                    "enunciate": [
                        "Challenges and Ethical Considerations with Grok 3"
                    ]
                },
                {
                    "text": [
                        "While Grok 3 offers immense potential, there are challenges that must be addressed."
                    ]
                },
                {
                    "text": [
                        "✅ Bias and Fairness: AI models can inadvertently inherit biases from training data, leading to biased decisions. Grok 3 incorporates fairness protocols to reduce bias, but ensuring equitable outcomes remains a priority."
                    ]
                },
                {
                    "text": [
                        "✅ Job Displacement: With automation on the rise, some jobs may be replaced by AI-driven processes. Grok 3’s solutions aim to enhance human workers' capabilities, but reskilling programs will be vital to helping workers transition to new roles."
                    ]
                },
                {
                    "text": [
                        "✅ Data Privacy: Data privacy concerns continue to be a significant issue. Grok 3 adheres to global privacy regulations like GDPR to ensure that data is handled responsibly and securely."
                    ]
                },
                {
                    "enunciate": [
                        "The Future of Grok 3: Beyond the Horizon"
                    ]
                },
                {
                    "text": [
                        "Grok 3 is only the beginning. The future of AI-powered data analysis looks promising, with Grok 3 setting the stage for more advanced capabilities in predictive analytics, automated decision-making, and intelligent data processing."
                    ]
                },
                {
                    "text": [
                        "As we continue to explore new frontiers, Grok 3 will enable businesses to unlock insights faster, solve complex problems more efficiently, and ultimately drive innovation in AI."
                    ]
                },
                {
                    "quote": [
                        "AI is not the future; it is the present. Grok 3 brings us closer to a smarter world where machines and humans work hand in hand for progress.",
                        "Unknown"
                    ]
                },
                {
                    "enunciate": [
                        "Reference"
                    ]
                },
                {
                    "link": [
                        {
                            "label": "AI Research Papers on Grok 3",
                            "href": "https://arxiv.org/list/cs.AI/recent"
                        }
                    ]
                }
            ],
            "article_title": "The Evolution of Grok 3: Redefining Data Processing with AI",
            "article_date": new Date()
        }


        await Server.create({
            collection: 'articles',
            data: obj1
        })
    }
}).signal













































