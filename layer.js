
module.exports = function() {

    console.log("layer.js exports")

    var LayerAPI = require('layer-api');
    var layer = new LayerAPI({
        token: "3hcmeMtxrrhMGrb2lpA15ur1UxEe8R2lWIQnka6vvxMXjl2P",
        appId: "d3d0a8da-c2ce-11e5-851e-576e000000b0"
    });

    var layerEx = {}
    layerEx.createPichangaConversation = function(userId, pichangaName, pichangaId, callback){
        try{
            layer.conversations.create(
                {participants: [], metadata:{"info":
                {"background_color": "#3c3c3c",
                    "title": pichangaName,
                    "pichangaId":""+pichangaId}
                }}, function(err, res) {
                    console.log("layer.createPichangaConversation res", res);
                    console.log("layer.createPichangaConversation res", err);
                    if(err){

                    }else{
                        var cid = res.body.id;
                        callback(cid);
                    }
            });

        }catch (e)
        {
            console.log(e)
        }
    }

    layerEx.addUserToConversation = function(conversationId, userId, callback){
        console.log("layerEx.addUserToConversation ", arguments)

        if(!conversationId) return callback("conversationId is required");

        var operations = [
            {"operation": "add", "property": "participants", "value": ""+userId}
        ];
        layer.conversations.edit(conversationId, operations, function(err, res) {
            if (err)
                return console.error(err);
            callback(res)
        });
    }

    layerEx.removeUserFromConversation = function(conversationId, userId, callback){
        console.log("layerEx.addUserToConversation ", arguments)

        if(!conversationId) return callback("conversationId is required");

        var operations = [
            {"operation": "remove", "property": "participants", "value": ""+userId}
        ];
        layer.conversations.edit(conversationId, operations, function(err, res) {
            if (err)
                return console.error(err);
            callback(res)
        });
    }

    layerEx.getConversationByCID = function(conversationId, callback){
        if(!conversationId) return callback("conversationId is required");

        layer.conversations.get(conversationId, function(err, res) {
            if (err)
                return console.error(err);
            callback(res.body)
        });
    }

    return layerEx;
};