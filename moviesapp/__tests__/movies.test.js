const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

let driver;

beforeAll(async () => {
  driver = new Builder().forBrowser(Browser.CHROME).build();
});

afterAll(async () => {
  await driver.quit();
});

describe("Test the Movie App", () => {
    test("can add a movie", async () => {
        //navigate to the web app => localhost:3000
        await driver.get('http://localhost:3000');
        //find the input box and type in the name of the movie
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys("The Matrix")
        //find the button and click it
        await driver.findElement(By.css('button[type="submit"]')).click()
        //wait until the movie appears in list
        const addedMovie = await driver.wait(until.elementLocated(By.css('#movies-list li label')), 1000)
        //check that the movie appears in the list
        expect(await addedMovie.getText()).toBe('The Matrix');
    });
    test("can remove a movie", async () => {
        await driver.get('http://localhost:3000');
        //find the input box and type in the name of the movie
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys("The Matrix")
        //find the button and click it
        await driver.findElement(By.css('button[type="submit"]')).click()

        await driver.findElement(By.css('button[class="delete-btn"]')).click()

        const deletedMovie = await driver.wait(until.elementLocated(By.css('#message')), 1000)
        expect(await deletedMovie.getText()).toBe("The Matrix deleted!");
    })

    test("can mark movie as watched", async () => {
        await driver.get('http://localhost:3000');
        //find the input box and type in the name of the movie
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys("The Matrix")
        //find the button and click it
        await driver.findElement(By.css('button[type="submit"]')).click()
        await driver.findElement(By.css('input[type="checkbox"]')).click()
        const watchedMovie = await driver.wait(until.elementLocated(By.css('#message')), 1000)
        expect(await watchedMovie.getText()).toBe("Watched The Matrix")
    })

    test("can mark movie as watched", async () => {
        await driver.get('http://localhost:3000');
        //find the input box and type in the name of the movie
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys("The Matrix")
        //find the button and click it
        await driver.findElement(By.css('button[type="submit"]')).click()
        await driver.findElement(By.css('input[type="checkbox"]')).click()
        await driver.findElement(By.css('input[type="checkbox"]')).click()
        const unwatchedMovie = await driver.wait(until.elementLocated(By.css('#message')), 1000)
        expect(await unwatchedMovie.getText()).toBe("Added back The Matrix")
    })
    
})
