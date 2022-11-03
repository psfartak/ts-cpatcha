# ts-cpatcha

Typescript based captcha.

## usage

```typescript
let captcha = new Captcha(canvasElement);
captcha.generate(5, Captcha.numbers + Captcha.lowercaseAlphabet + Captcha.uppercaseAlphabet,
      {font: "consolas", size: 60, style: "bold"},
      15, 70);
```
