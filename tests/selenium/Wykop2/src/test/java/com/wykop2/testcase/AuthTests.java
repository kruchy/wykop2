package com.wykop2.testcase;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import static org.junit.Assert.assertEquals;

/**
 * Created by Marek on 2017-06-05.
 */
public class AuthTests extends TestCase {
    String username = "seba";
    String password = "seba";

    public AuthTests(WebDriver driver) {
        super(driver);
    }

    public void testRegister(){

    }

    public void testLogin(){
        driver.get(signinPage);
        driver.findElement(By.id("username")).sendKeys(username);
        driver.findElement(By.id("password")).sendKeys(password);
        driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/div/div/div/div[2]/form/div[3]/button")).click();

        assertEquals("Log out",driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/ul/li/a")).getText());
        assertEquals("Profil",driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/nav/a[3]")).getText());
        assertEquals("Nowy post",driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/nav/a[2]")).getText());
    }

    public void testLogout(){
        driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/ul/li/a")).click();
        assertEquals("Login",driver.findElement(By.xpath(loginXpath)).getText());
    }
}
