package com.wykop2.testcase;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.UUID;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by Marek on 2017-06-06.
 */
public class PostingTests extends TestCase {

    public PostingTests(WebDriver driver) {
        super(driver);
        AuthTests.createAndLoginUser(driver);
    }

    public void testAddPost(boolean omitContent){
        driver.findElement(By.xpath(newPostButtonXpath)).click();

        WebElement title = driver.findElement(By.id("title"));
        WebElement img = driver.findElement(By.id("img"));
        WebElement content = driver.findElements(By.id("content")).get(1);

        assertEquals("Wprowadź nazwę tematu",title.getAttribute("placeholder"));
        assertEquals("img", img.getAttribute("name"));
        assertEquals("Napisz czym chcesz się podzielić...",content.getAttribute("placeholder"));

        final String titleText = UUID.randomUUID().toString().substring(0,10);
        String contentText = UUID.randomUUID().toString();
        title.sendKeys(titleText);
        content.sendKeys(contentText);

        //add
        driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/div/div/div/div/form/fieldset/div[4]/div/button")).click();
        sleep(100);

        List<WebElement> posts = driver.findElements(By.xpath("//*[@id=\"content\"]/div/div/div/div/div[1]/div"));

        //check for added element
        assertTrue(posts.stream().anyMatch(post -> (post.getText().contains(titleText)) && post.getText().contains(contentText)) );
    }
}
