package com.wykop2.testcase;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * Created by Marek on 2017-06-05.
 */
public class ConnectivityTests {

    WebDriver driver;

    public ConnectivityTests(WebDriver driver){
        this.driver = driver;
    }

    public void testAccesHomePage(){
        driver.get("http://localhost:3000");
        assertEquals("Wykop 2",driver.getTitle());
    }

    public void testGoToRegisterPage(){
        WebElement element = driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/ul/li[2]/a"));
        element.click();
        List<WebElement> elements = driver.findElements(By.xpath("//*[@id=\"content\"]/div/div/div/div/div/div[1]/div/h1"));
        assertEquals(1,elements.size());
        assertEquals("Rejestracja",elements.get(0).getText());
    }

    public void testGoToLoginPage(){
        WebElement element = driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/ul/li[1]/a"));
        element.click();
        List<WebElement> elements = driver.findElements(By.xpath("//*[@id=\"content\"]/div/div/div/div/div/div[1]/div/h1"));
        assertEquals(1,elements.size());
        assertEquals("Logowanie",elements.get(0).getText());
    }
}
