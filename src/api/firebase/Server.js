import {
    addDoc,
    collection as firestoreCollection,
    deleteDoc,
    doc,
    getCountFromServer,
    getDoc,
    getDocs,
    increment,
    limit,
    query,
    startAfter,
    updateDoc,
    where,
    orderBy,
    endBefore,
    limitToLast
} from "firebase/firestore";
import {db} from "./FirebaseConfig";

export const Server = {
    getPaginatedData: async ({
        collection,
        orderByProp,
        direction = undefined,
        startAfterDoc,
        endBeforeDoc,
        filters = [],
        lim = null,
        // offset = null
    }) => {
        if (!collection) throw new Error("Collection is required");
        if (!orderByProp) throw new Error("Order by property is required");
        const dataCollection = firestoreCollection(db, collection);

        let queries = [],
            queryCount = [];

        if (filters.length) {
            for (const filter of filters) {
                queries.push(where(filter.field, filter.operator, filter.value));
                queryCount.push(where(filter.field, filter.operator, filter.value));
            }
        }

        /**
         * in order tho this work we need to create a firestore index, and the index have to be according to the query
         * firestore index can be created in the firebase console
         * ex:
         * Firestore Console:
         * field: 'article_date', parameters: 'desc'
         * Client:
         * orderBy('article_date', 'desc')
         * */
        let dataQuery = query(dataCollection, ...queries, orderBy(orderByProp[0], orderByProp[1]));

        if (lim) {
            dataQuery = query(dataQuery, limit(lim));
        }

        if (direction === 'next' && startAfterDoc) {
            dataQuery = query(dataQuery, startAfter(startAfterDoc));
        } else if (direction === 'prev' && endBeforeDoc) {
            dataQuery = query(dataQuery, endBefore(endBeforeDoc), limitToLast(lim))
        }

        try {
            let data = [];
            let res = await getDocs(dataQuery);
            res.docs.forEach(doc => { data.push({...doc.data(), id: doc.id})});

            const countQ = query(dataCollection, ...queryCount);
            const count = await getCountFromServer(countQ);
            const totalCount = count.data().count;

            return {
                data,
                lastDoc: res.docs[res.docs.length - 1],
                firstDoc: res.docs[0],
                totalCount
            };
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },
    getAll: async ({collection, filters = [], ...rest})  => {
        if (!collection) throw new Error("Collection is required");
        let queries = [];
        if (filters.length) {
            for (const filter of filters) {
                queries.push(where(filter.field, filter.operator, filter.value));
            }
        }

        let q = query(firestoreCollection(db, collection), ...queries);
        try {
            let data = [];
            let res = await getDocs(q);
            res.docs.forEach(doc => {
                data.push({...doc.data(),id: doc.id})
            })
            return data
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    },
    getById: async ({id, collection}) => {
        let promise = [];
        if (Array.isArray(id) && id.length > 0) {
            id.map(_id => promise.push(getDoc(doc(db, collection, _id))))
        } else {
            promise.push(getDoc(doc(db, collection, id)))
        }

        try {
            let data;
            const tempData = await Promise.all(promise);
            tempData.forEach(doc => {
                if (Array.isArray(id) && id.length > 0) {
                    data.push({...doc.data(), id: doc.id})
                } else {
                    data = {...doc.data(), id: doc.id}
                }
            })
            return data;
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    },
    update: async ({id, collection, data}) => {
        try {
            await updateDoc(doc(firestoreCollection(db, collection), id), data, {merge: true})
        } catch (error) {
            console.error("Error updating articles:", error);
        }
    },
    create: async ({collection, data}) => {
        try {
            await addDoc(firestoreCollection(db, collection), data);
            await Server.updateArticleStats({
                quantity: 1
            })
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    },
    delete: async ({id, collection}) => {
        try {
            await deleteDoc(doc(db, collection, id))
            await Server.updateArticleStats({
                quantity: -1
            })
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    },

    getLastArticles: async () => {
        try {
            const collectionRef = firestoreCollection(db, "articles"); // Reference to the collection

            // Create a query with filters
            const q = query(
                collectionRef,
                where("article_status", "==", true),
                orderBy("article_date", "desc"),
                limit(3)
            );

            const querySnapshot = await getDocs(q); // Fetch documents

            let data = [];
            querySnapshot.forEach(doc => {
                data.push({...doc.data(), id: doc.id})
            })

            return data
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    },

    // I'm going to implement the update of article_stats manually to not use functions yet
    updateArticleStats: async ({quantity}) => {
        let id = 'qytXChkrXeAkiM0l92xn'
        try {
            const docRef = doc(firestoreCollection(db, 'article_stats'), id);
            await updateDoc(docRef, {quantity: increment(quantity)});
        } catch (error) {
            console.error("Error updateArticleStats", error);
        }
    },

    articleStatus: async (id) => {},
    getArticles: async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "articles"));
            const dataSnapshot  = await getDoc(doc(db, "article_stats", 'qytXChkrXeAkiM0l92xn'));
            const articles = querySnapshot.docs.map(doc => ({id: doc.id,...doc.data()}));
            const dataCount = dataSnapshot.data().quantity
            return {articles, dataCount};
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    },
    getArticleById: async (id) => {

    },
    getArticlesByTag: async (req, res) => {},
    handlePagination: async (req, res) => {},
    articleSearch: async (req, res) => {},

    createArticle: async (req, res) => {},
    updateArticle: async (req, res) => {},
}