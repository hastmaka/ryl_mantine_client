export const ServiceModalCardDataEnglish = [
    {
        title: 'SEO Services',
        name: 'seo',
        sub: `Starting at $299.00`,
        dropDownLabel: 'Package',
        placeholder: 'Chose',
        selectData: [
            {
                value: 'base',
                label: 'Base $299',
                price: 299,
                description: [
                    `Keyword Research: Basic keyword research for targeted terms.`,
                    `On-Page SEO: Optimization of meta tags, headers, and content for up to 5 pages.`,
                    `Technical SEO: Basic technical audit and fixes (e.g., URL structure, sitemaps).`,
                    `Google Analytics Setup: Setup and basic configuration.`,
                    `Report: Basic performance report.`
                ],

            }, {
                value: 'normal',
                label: 'Regular $599',
                price: 599,
                description: [
                    `Keyword Research: Comprehensive keyword research and competitor analysis.`,
                    `On-Page SEO: Optimization of meta tags, headers, and content for up to 10 pages.`,
                    `Technical SEO: In-depth technical audit and fixes (e.g., mobile optimization, page speed improvements).`,
                    `Google Analytics & Search Console Setup: Setup and advanced configuration.`,
                    `Backlink Strategy: Basic backlink strategy and link building.`,
                    `Report: Detailed performance report with insights and recommendations.`
                ],

            }, {
                value: 'pro',
                label: 'Pro $799',
                price: 799,
                description: [
                    `Keyword Research: Extensive keyword research and in-depth competitor analysis.`,
                    `On-Page SEO: Optimization of meta tags, headers, and content for unlimited pages.`,
                    `Technical SEO: Comprehensive technical audit and advanced fixes (e.g., schema markup, HTTPS setup).`,
                    `Google Analytics, Search Console, & Tag Manager Setup: Full setup and advanced tracking.`,
                    `Backlink Strategy: Advanced backlink strategy with high-quality link building.`,
                    `Local SEO: Optimization for local search and Google My Business setup.`,
                    `Report: Comprehensive performance report with actionable insights, recommendations, and competitor analysis.`,
                ],
                divider: false
            }
        ]
    },
    {
        title: `ADs Services`,
        name: 'ads',
        sub: `Starting at $399.00`,
        dropDownLabel: 'Package',
        placeholder: 'Chose',
        selectData: [
            {
                value: 'base',
                label: 'Base $399',
                price: 399,
                description: [
                    `Platform Coverage: Google Ads`,
                    `Ad Creation: Basic ad copy and design for up to 2 campaigns.`,
                    `Budget Management: Optimization of ad spend within a fixed budget.`,
                    `Targeting: Basic audience targeting and segmentation.`,
                    `Supervision: 7 days of supervision to monitor campaign performance.`
                ],
            }, {
                value: 'normal',
                label: 'Regular $599',
                price: 599,
                description: [
                    `Platform Coverage: Google Ads`,
                    `Ad Creation: Professional ad copy and design for up to 2 campaigns.`,
                    `Budget Management: Optimization of ad spend with regular adjustments.`,
                    `Targeting: Advanced audience targeting, segmentation, and re-targeting.`,
                    `A/B Testing: Testing of ad variations for better performance.`,
                    `Supervision: 14 days of supervision to monitor campaign performance with insights and recommendations.`
                ],
            }, {
                value: 'pro',
                label: 'Pro $799',
                price: 799,
                description: [
                    `Platform Coverage: Google Ads`,
                    `Ad Creation: Premium ad copy and design for up to 4 campaigns.`,
                    `Budget Management: Dynamic ad spend optimization with continuous adjustments.`,
                    `Targeting: Expert audience targeting, segmentation, re-targeting, and lookalike audiences.`,
                    `A/B Testing: Comprehensive testing of multiple ad variations.`,
                    `Conversion Tracking: Setup and optimization of conversion tracking.`,
                    `Supervision: 30 days of supervision to monitor campaign performance with in-depth insights, recommendations, and competitor analysis.`
                ],
            }
        ]
    },
    {
        title: `E-Commerce`,
        name: 'e-commerce',
        sub: `Starting at $699.00`,
        dropDownLabel: 'Package',
        placeholder: 'Chose',
        selectData: [
            {
                value: 'base',
                label: 'Base $699',
                price: 699,
                description: [
                    `Platform Setup: Basic setup of your online store on Shopify.`,
                    `Product Listing: Listing and description of up to 5 products.`,
                    `Payment Gateway Integration: Integration of standard payment gateways.`,
                    `Basic SEO: Basic search engine optimization for product pages.`,
                    `Support: 7 days of support for troubleshooting.`
                ],
            }, {
                value: 'normal',
                label: 'Regular $1099',
                price: 1099,
                description: [
                    `Platform Setup: Comprehensive setup of your online store on Shopify.`,
                    `Product Listing: Listing and description of up to 10 products.`,
                    `Payment Gateway Integration: Integration of multiple payment gateways.`,
                    `Enhanced SEO: Advanced search engine optimization for better visibility.`,
                    `Support: 14 days of support for troubleshooting.`,
                ],
            }, {
                value: 'pro',
                label: 'Pro $1699',
                price: 1699,
                description: [
                    `Platform Setup: Full setup and customization of your online store on Shopify.`,
                    `Product Listing: Listing and description of up to 20 products.`,
                    `Payment Gateway Integration: Integration of multiple payment gateways with advanced features.`,
                    `Advanced SEO: Comprehensive search engine optimization for maximum visibility.`,
                    `Support: 30 days of support for troubleshooting and performance optimization.`,
                ],
            }
        ]
    },
    {
        title: `Static Website`,
        name: 'static-website',
        price: 299,
        sub: `Starting at $299.00`,
        width: 70, //input width
        dropDownWidth: 75, //dropdown width
        icon: true, //show icon
        dropDownLabel: 'Pages',
        text: [
            `Price is based on pages and sections.`,
            'Full responsive design (work perfect in every device).',
            `Ideal for: Portfolios, Landing Pages, Event Pages, Personal Websites.`,
        ],
        placeholder: `1`,
        selectData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    {
        title: `Dynamic Website`,
        name: 'dynamic-website',
        price: 499,
        sub: `Starting at $499.00`,
        width: 70, //input width
        dropDownWidth: 75, //dropdown width
        icon: true, //show icon
        text: [
            `Price is based on pages, sections and integrations.`,
            'Full responsive design (work perfect in every device).',
            `All depends of what you web site needs, we can make server side, all kind all integrations (payment gateway, content management, etc...), form submission, APIs and third party services, etc...`,
        ],
        dropDownLabel: 'Pages',
        placeholder: `1`,
        selectData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    {
        title: `Web Application`,
        name: 'web-application',
        price: 1099,
        sub: `Starting at $1099.00`,
        width: 70, //input width
        dropDownWidth: 75, //dropdown width
        dropDownLabel: 'Modules',
        icon: true, //show icon
        text: [
            `Price is based on modules quantity, modules complexity and integrations.`,
            `Look at every module like a part of the application that can make a specific work and is connected with the whole application at the same time.`,
            `An enterprise web application is a large-scale, secure, and scalable software system designed to support business operations. It integrates with other systems, handles high transaction volumes, and offers customization to meet specific organizational needs. Key features include robust security, seamless integration, high performance, and dedicated support.`,
        ],
        placeholder: `1`,
        selectData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    {
        title: `Social Media Management`,
        name: 'social-media-management',
        sub: `Starting at $399.00`,
        dropDownLabel: 'Package',
        placeholder: 'Chose',
        selectData: [
            {
                value: 'base',
                label: 'Base $399',
                price: 399,
                description: [
                    `7 days Management.`,
                    `5 Statics Posts.`,
                    `4 Stories Posts.`,
                    `Caption + Hashtags + Schedule`,
                    `Unlimited Revisions.`,
                ],
            }, {
                value: 'normal',
                label: 'Regular $499',
                price: 499,
                description: [
                    `14 days Management.`,
                    `14 Statics Posts`,
                    `4 Stories Posts`,
                    `4 Reels`,
                    `Caption + Hashtags + Schedule`,
                    `Unlimited Revisions.`,
                ],
            },
            {
                value: 'pro',
                label: 'Pro $799',
                price: 799,
                description: [
                    `30 days Management.`,
                    `30 Statics Posts`,
                    `8 Stories Posts`,
                    `4 Reels`,
                    `Caption + Hashtags + Schedule`,
                    `Unlimited Revisions.`,
                ],
            }
        ]
    },
    {
        title: `Branding`,
        name: 'branding',
        sub: `Starting at $299.00`,
        dropDownLabel: 'Package',
        placeholder: 'Chose',
        selectData: [
            {
                value: 'base',
                label: 'Base $299',
                price: 299,
                description: [
                    `Logo Design: Custom logo creation.`,
                    `Color Palette: Selection of primary and secondary colors.`,
                    `Typography: Selection of fonts for consistent use.`,
                    `Basic Brand Guidelines: Document outlining logo usage, colors, and fonts.`,
                    `Business Card Design: Simple business card design.`,
                    `3 Revisions Round.`,
                ],
            }, {
                value: 'normal',
                label: 'Regular $499',
                price: 499,
                description: [
                    `Everything in Base: All features of the Base Branding Package.`,
                    `Additional Logo Variations: Multiple logo variations for different uses.`,
                    `Social Media Kit: Profile and cover images for major social media platforms.`,
                    `Stationery Design: Business card, letterhead, and envelope design.`,
                    `Brand Guidelines: Comprehensive document including logo usage, colors, fonts, and basic do’s and don’ts`,
                    `Unlimited Revisions.`,
                ],
            },
            {
                value: 'pro',
                label: 'Pro $799',
                price: 799,
                description: [
                    `Everything in Regular: All features of the Regular Branding Package.`,
                    `Brand Strategy: In-depth brand strategy development.`,
                    `Tagline Development: Creation of a memorable tagline.`,
                    `Extended Brand Guidelines: Detailed brand guidelines including logo usage, colors, fonts, imagery style, and advanced do’s and don’ts.`,
                    `Unlimited Revisions.`,
                ],
            }
        ]
    },
    {
        title: `Consulting Service`,
        name: 'consulting',
        price: 50,
        sub: `50/Hr (Phone, Video Call, or Chat)`,
        width: 70, //input width
        dropDownWidth: 75, //dropdown width
        dropDownLabel: 'Hours',
        icon: true, //show icon
        text: [
            `Our Enterprise Consulting Service provides tailored solutions to optimize operations and achieve strategic goals with a modular approach.`,
        ],
        placeholder: `1`,
        selectData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }
]