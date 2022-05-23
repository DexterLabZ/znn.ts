import { Project } from "./accelerator";

class ProjectList{
  count: number;
  list: Array<Project>

  constructor(count: number, list: Array<Project>){
    this.count = count;
    this.list = list;    
  }
}