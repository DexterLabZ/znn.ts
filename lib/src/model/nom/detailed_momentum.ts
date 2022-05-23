import { AccountBlock } from "./account_block";
import { Momentum } from "./momentum";

export class DetailedMomentum{
  blocks: Array<AccountBlock>;
  momentum: Momentum;

  constructor(blocks: Array<AccountBlock>, momentum: Momentum){
    this.blocks = blocks;
    this.momentum = momentum;
  }

  static fromJson(json: {[key: string]: any}): DetailedMomentum {
      return new DetailedMomentum(
        json['blocks'],
        Momentum.fromJson(json['momentum'])
      );
  }

  toJson(): {[key: string]: any}{
    return {
      blocks: this.blocks,
      momentum: this.momentum.toJson()
    };
  }
}

export class DetailedMomentumList{
  count?: number;
  list?: Array<DetailedMomentum>;

  constructor(count?: number, list?: Array<DetailedMomentum>){
    this.count = count;
    this.list = list;
  }

  static fromJson(json: {[key: string]: any}): DetailedMomentumList {
      return new DetailedMomentumList(
        json['count'],
        json['list'].map((item: any) => DetailedMomentum.fromJson(item))
      );
  }

  toJson(): {[key: string]: any}{
    return {
      count: this.count,
      list: this.list
    };
  }

}