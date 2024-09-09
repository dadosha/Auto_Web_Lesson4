let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 5000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 5500);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent.trim());
    expect(actual).toContain("Get started with Team")
  }, 6000);
});

test("The h2 header content'", async () => {
  await page.goto("https://github.com/features/actions");
  const selector = "h2[class=\'h4-mktg mb-4\']"

  await page.waitForSelector(selector);
  const expect_text = "Run a workflowon any GitHub event";
  const actual = await page.$eval(selector, element  => element.textContent);

  expect(actual).toEqual(expect_text);
}, 5000);

test("The button text'", async () => {
  await page.goto("https://github.com/features/actions");
  const selector = ".btn-mktg.btn-large-mktg"

  await page.waitForSelector(selector);
  const expect_text = "Get started with Actions";
  const actual = await page.$eval(selector, element  => element.textContent.trim());

  expect(actual).toEqual(expect_text);
}, 5500);

test("The page contains Sign in button", async () => {
  await page.goto("https://github.com/features/actions");
  await page.click("div[class='mr-2 color-fg-muted'] svg");

  const selector = ".Link.color-fg-accent.text-normal.ml-2";

  await page.waitForSelector(selector);
  const expect_text = "Search syntax tips";
  const actual = await page.$eval(selector, element  => element.textContent.trim());

  expect(actual).toEqual(expect_text);
}, 6000);