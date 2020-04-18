export function Bubble() {

    this.bubbleMap = new Map();

    this.addNode = function(key,child){
        if (! this.bubbleMap.has(key)){
            newNode = new Node(key)
        }
        else{
            newNode = this.bubbleMap.get(key)
        }



        for(let i = 0; i < child.length; i++){
            
            if( ! this.bubbleMap.has(child[i])){
                childNode = new Node(child[i])
            }
            else{
                childNode = this.bubbleMap.get(child[i])
            }

            childNode.addParent(newNode)
            newNode.addChild(childNode)
        }
        this.bubbleMap.set(key,newNode)
    }
}





export function Node(key) {
    this.key = key;
    this.parent = new Set()
    this.child = new Set()


    this.addParent = function(parent){
        this.parent.add(parent);


    }
    this.addChild = function(child){
        this.child.add(child);
    }

    this.getParent = function(){
        return this.parent;
    }

    this.getChild = function(){
        return this.child;
    }
}



// main
const googleTrends = require('google-trends-api');
googleTrends.relatedTopics({keyword: 'Dead Pool'})
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err);
})