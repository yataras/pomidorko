import { Selector } from 'testcafe';

export default class Page {
  constructor () {
    this.pomidorkoCounter = Selector('span.counter');
    this.startButton = Selector('button#run');
    this.pageTitle = Selector('head > title');
    this.resetButton = Selector('button#reset');
    this.pauseButton = Selector('button#pause');
  }
}
