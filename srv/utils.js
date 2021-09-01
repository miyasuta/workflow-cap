const core = require('@sap-cloud-sdk/core')

const _checkResponse = function (responses) {
    const result = responses.reduce((previous, current)=> {
        console.log('previous ==>', previous)
        if (current.status !== 200) {
            previous.hasError = true
            previous.message = previous.message + current.body.error?.message + '\n'
        } else {
            if (!current.body.hasScope) {
                previous.hasError = true
                previous.message = previous.message + `User ${current.body.userId} does not have scope ${current.body.scope}\n` 
            }
        }
        return previous
    },
    {
        hasError: false,
        message: ""
    })

    return result
}

module.exports = {
    getDestination : function (req) {
        const jwt = req.headers.authorization.slice(7)
        if (!jwt) {
            throw 'JWT not found!'
        }
        return {
            destinationName: 'WorkflowRESTAPI',
            jwt: jwt   
        }
    },

    checkApprovers : async function (req) {
        const scope = 'workflow!b10150.AUTHORIZE_WITH_INSTANCE_ROLES'
        const processors = req.data.Processors.map((processor, index) => {
            return {
                id: index.toString(),
                method: 'GET',
                url: `/userHasScope(userId='${processor.userId}',scope='${scope}')`,
                headers: {
                    'content-type' : 'application/json'
                }
            }
        })

        try {
            const response = await core.executeHttpRequest({ destinationName: 'user-roles-srv'},{
                method: 'POST',
                url: '/$batch',
                headers : {
                    'content-type' : 'application/json'
                },
                data: {
                    requests: processors
                }
            })  
            const result = _checkResponse(response.data.responses)
            if(result.hasError) {
                req.reject(409, result.message)
            } else {
                return true
            }
        } catch (err) {
            req.reject(err)
        }    
    }
}