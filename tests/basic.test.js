import { Selector } from 'testcafe';
import Page from './Page';

fixture(`Index page`).page('http://localhost:8080');

const page = new Page();

test('Head > Title contains "Pomidorko"', async testController => {
  await testController.expect(page.pageTitle.innerText).eql('Pomidorko');
});

test('Before start, Pomidorko counter is not visible', async testController => {
  await testController.expect(page.pomidorkoCounter.innerText).eql('');
});

test('Before start, Reset button is disabled', async testController => {
  await testController.expect(page.resetButton.hasAttribute('disabled')).ok();
});

test('Start running timer', async testController => {
  await testController.click(page.startButton).expect(page.startButton.exists).notOk();
});

test('On start, Pomidorko counter is equal to 1', async testController => {
  await testController
    .click(page.startButton).wait(1000)
    .expect(page.pomidorkoCounter.innerText).eql('Pomidorko #1');
});

test('On start, Pause button is shown', async testController => {
  await testController
    .click(page.startButton).wait(1000)
    .expect(page.pauseButton.innerText).eql('Pause');
});

test('On start, Reset button is enabled', async testController => {
  await testController
    .click(page.startButton).wait(1000)
    .expect(page.resetButton.hasAttribute('disabled')).notOk();
});

test('On pause, Resume button is shown', async testController => {
  await testController
    .click(page.startButton).wait(1000)
    .click(page.pauseButton).wait(1000)
    .expect(page.startButton.innerText).eql('Resume');
});

test('On reset, Pomidorko counter is not visible', async testController => {
  await testController
    .click(page.startButton).wait(1000)
    .click(page.resetButton).wait(1000)
    .expect(page.pomidorkoCounter.innerText).eql('');
});
