import {observable, action, makeObservable, runInAction } from 'mobx';
import axios from "axios";

class PositionSingleTon{

    positionNames=[];
    constructor(){
        makeObservable(this,{
            positionNames:observable,
            getPositionNames:action
            
        })
        this.init();     
    }

    init(){
        this.getPositionNames();
        console.log("position names:")
        this.positionNames.map((p,index)=>{
            console.log(p)
        })
        }
    
        async getPositionNames(){
          await axios.get(`https://localhost:7148/api/Position/GetPositionsNames`).then((result)=>{
                runInAction(()=>{
                  this.positionNames=result.data;
                  if(this.positionNames[0]==null)
        console.log("data is null");
        else
        console.log(this.positionNames[1]);
        this.positionNames.map(p=>{
            console.log(p)
        });
                }
    
                )
            }).catch((error)=>{ 
                console.log(error);
             })
        }
}
export default new PositionSingleTon();