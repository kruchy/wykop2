package com.wykop2.testcase;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import java.util.UUID;

import static org.junit.Assert.assertEquals;

/**
 * Created by Marek on 2017-06-05.
 */
public class AuthTests extends TestCase {
    String username;
    String password;
    String email;

    public AuthTests(WebDriver driver) {
        super(driver);
        username = UUID.randomUUID().toString().substring(0,7);
        password = username;
        email = username + "@gmail.com";
    }

    public void testRegister(){
        register(driver,username,password,email);
        sleep(100);
        assertEquals("Logowanie",driver.findElement(By.xpath(h1CaptionXpath)).getText());
    }

    public void testLogin(){
        login(driver,username,password);

        assertEquals("Log out",driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/ul/li/a")).getText());
        assertEquals("Profil",driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/nav/a[3]")).getText());
        assertEquals("Nowy post",driver.findElement(By.xpath(newPostButtonXpath)).getText());
    }

    public void testLogout(){
        driver.findElement(By.xpath("//*[@id=\"content\"]/div/div/header/div/div/ul/li/a")).click();
        assertEquals("Login",driver.findElement(By.xpath(loginXpath)).getText());
    }

    private static void login(WebDriver webDriver, String username, String password){
        webDriver.get(signinPage);
        webDriver.findElement(By.id("username")).sendKeys(username);
        webDriver.findElement(By.id("password")).sendKeys(password);
        webDriver.findElement(By.xpath("//*[@id=\"content\"]/div/div/div/div/div/div[2]/form/div[3]/button")).click();
    }

    private static void register(WebDriver webDriver, String username, String password, String email){
        webDriver.get(signupPage);

        assertEquals("Rejestracja", webDriver.findElement(By.xpath(h1CaptionXpath)).getText());

        webDriver.findElement(By.id("username")).sendKeys(username);
        webDriver.findElement(By.id("email")).sendKeys(email);
        webDriver.findElement(By.id("password")).sendKeys(password);
        webDriver.findElement(By.xpath(registerButtonXpath)).click();
    }

    public static void createAndLoginUser(WebDriver driver){
        String username = UUID.randomUUID().toString().substring(0,7);
        String password = username;
        String email = username + "@gmail.com";
        register(driver,username,password,email);
        login(driver,username,password);
        sleep(100);
    }


}
