class Bubble{
    constructor(){
        this.bubbleMap = new Map();
    }
    addNode (key,child){
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

export default Bubble