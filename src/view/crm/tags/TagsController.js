import {SignalController} from "@/signal/SignalController.js";
import {Server} from "@/api/firebase/Server.js";

export const TagsController = new SignalController({
    mode: 'create',
    firestoreTagId: '3WOQcuWgYezCKZABj59B'
}, {
    tagGetData: async () => {
        let me = TagsController
        const response = await Server.getAll({
            collection: 'tags'
        })

        me.tagData = response[0].tags
        me.activeTagData = response[0].tags_active
        me.tagLoading = false
    },
    handleAddTag: async () => {
        let me = TagsController,
            exitTag = me.tagData.findIndex(tag => tag === me.formData.tag)

        if (exitTag === -1) {
            me.tagData = [...me.tagData, me.formData.tag]
            me.resetState()
            await Server.update({
                id: me.firestoreTagId,
                collection: 'tags',
                data: {
                    tags: me.tagData
                }
            })
        }
    },
    handleDeleteTag: async (tag) => {
        let me = TagsController
        me.tagData = me.tagData.filter(item => item !== tag)
        try {
            await Server.update({
                id: me.firestoreTagId,
                collection: 'tags',
                data: {
                    tags: me.tagData
                }
            })
        } catch (e) {
            throw new Error(e)
        }
    }
}).signal