package com.wykop2.testcase;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * Created by Marek on 2017-06-05.
 */
public class NavigationTests extends TestCase{

    public NavigationTests(WebDriver driver){
        super(driver);
    }

    public void testAccesHomePage(){
        driver.get(homePage);
        assertEquals("Wykop 2",driver.getTitle());
    }

    public void testGoToRegisterPage(){
        WebElement element = driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/ul/li[2]/a"));
        element.click();
        List<WebElement> elements = driver.findElements(By.xpath(h1CaptionXpath));
        assertEquals(1,elements.size());
        assertEquals("Rejestracja",elements.get(0).getText());
    }

    public void testGoToLoginPage(){
        WebElement element = driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/ul/li[1]/a"));
        element.click();
        List<WebElement> elements = driver.findElements(By.xpath(h1CaptionXpath));
        assertEquals(1,elements.size());
        assertEquals("Logowanie",elements.get(0).getText());
    }
}
