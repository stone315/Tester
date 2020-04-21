const googleTrends = require('google-trends-api')

// IO
// This part will be replaced by an element in html
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Search:', input_value => {

    pendinglist = [input_value]
    Dic = new Bubble()
    num = 0
    async function f(callback){
        while( num<=1000 && pendinglist.length != 0){
            currvalue = pendinglist[0]
            pendinglist.shift()
        
            let promise = new Promise((resolve,reject) => search(currvalue, function(result){
                num = num + result.length
                
                pendinglist = pendinglist.concat(result)
                Dic.addNode(currvalue,result)

                resolve('done')
            }))
            await promise;
            
        }
        
        return callback(Dic)
    }
    f(function(Dic){
        console.log(Dic)
    });
    
})


//search relative topics and queries
function search(value, callback){
    
    topcis_search(value,function(title,type)
    {
        queries_search(value,function(query){
            let result = title.concat(query)
            return callback(result)
        })
    })
    
}

// Search relative topics from google Trends 
// Return  list of (topics and type of the topic)
function topcis_search(value,callback){
    let title = []
    let type = []
    googleTrends.relatedTopics({keyword: value})
    .then((res) => {
        while (res.indexOf('"title"') >= 0){
            index = res.indexOf('"title"') + 9
            endindex = index
            while (res[endindex] != '"'){
                endindex += 1
            }
      
            title.push(res.substring(index,endindex))
      
            index = res.indexOf('"type"') + 8
            endindex = index
            while (res[endindex] != '"'){
                endindex += 1
            }
      
            type.push(res.substring(index,endindex))
            res = res.substring(endindex,res.length)
            
        }
        return callback(title, type)
        
    })
    .catch((err) => {
        console.log(err);
    })
    
    
}

//Search relative queries from google trends
//Return a list of queries
function queries_search(value,callback){
    let query = []
    googleTrends.relatedQueries({keyword: value})
    .then((res) => {
        while (res.indexOf('"query"') >= 0){
            index = res.indexOf('"query"') + 9
            endindex = index
            while (res[endindex] != '"'){
                endindex += 1
            }
      
      
            query.push(res.substring(index,endindex))
            res = res.substring(endindex,res.length)
            
        }
        return callback(query)
        
    })
    .catch((err) => {
        console.log(err);
    })
}



class Node{
    constructor(key){
        this.key = key;
        this.parent = new Set()
        this.child = new Set()
    }

    addParent(parent){
        this.parent.add(parent);
    }
    addChild(child){
        this.child.add(child);
    }
    getKey(){
        return this.key;
    }
    getParent(){
        return this.parent;
    }

    getChild(){
        return this.child;
    }
}


class Bubble{
    constructor(){
        this.bubbleMap = new Map();
    }
    addNode (key,child){
        if (! this.bubbleMap.has(key)){
            var newNode = new Node(key)
        }
        else{
            var newNode = this.bubbleMap.get(key)
        }


        for(let i = 0; i < child.length; i++){
            
            if( ! this.bubbleMap.has(child[i])){
                var childNode = new Node(child[i])
            }
            else{
                var childNode = this.bubbleMap.get(child[i])
            }

            childNode.addParent(newNode)
            newNode.addChild(childNode)
        }
        this.bubbleMap.set(key,newNode)
    }
}

