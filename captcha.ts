type Font = {
  size: number,
  font: string,
  style: string
};

export class Captcha {
  private captcha: string[] = [];
  private readonly width: number;
  private readonly height: number;
  private readonly context: CanvasRenderingContext2D | null;
  private readonly canvas: HTMLCanvasElement;

  public static readonly uppercaseAlphabet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  public static readonly lowercaseAlphabet: string = "abcdefghijklmnopqrstuvwxyz";
  public static readonly numbers: string = "0123456789";
  public static readonly symbols: string = "!@#$%^&*";

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext('2d');
  }

  public generate(length: number = 10, characters?: string, font: Font = {size: 35, font: "conslas", style: "bold"}, lines: number = 5, dots: number = 30) {
    this.context?.clearRect(0, 0, this.width, this.height);
    this.captcha = [];
    characters = characters || Captcha.numbers;
    let tempX = this.width / length;
    console.log(this.width, tempX)

    for (let i = 0; i < length; i++) {
      let index = Math.floor(this.randomNumber(characters.length));
      this.captcha.push(characters[index].toLowerCase());

      let x = 10 + (i * tempX);
      let y = (font.size / 2) + this.randomNumber(this.height - font.size);
      if (this.context) {
        this.context.font = `${font.style} ${font.size}px ${font.font}`;
        this.context.translate(x, y);
        let deg = (this.randomNumber(30) * Math.PI) / 180;
        this.context.rotate(deg);
        this.context.fillStyle = this.randomColor();
        this.context.fillText(this.captcha[i], 0, 0);
        this.context.rotate(-deg);
        this.context.translate(-x, -y);
      }
    }
    this.randomLine(lines);
    this.randomDots(dots);
  }

  private randomLine(count: number = 5) {
    if (this.context)
      for (let i = 0; i < count; i++) {
        this.context.lineWidth = this.randomNumber(3);
        this.context.fillStyle = this.randomColor();
        this.context.beginPath();
        this.context.moveTo(
          this.randomNumber(this.width),
          this.randomNumber(this.height),
        );
        this.context.lineTo(
          this.randomNumber(this.width),
          this.randomNumber(this.height),
        )
        this.context.stroke();
      }
  }


  private randomDots(count: number = 30) {
    if (this.context)
      for (let i = 0; i < count; i++) {
        this.context.lineWidth = this.randomNumber(3);
        this.context.fillStyle = this.randomColor();
        this.context.beginPath();
        let x = this.randomNumber(this.width);
        let y = this.randomNumber(this.height);
        this.context.moveTo(x, y);
        this.context.lineTo(x + 1, y + 1);
        this.context.stroke();
      }
  }

  public check(text: string) {
    return this.captcha.join("").toLowerCase() === text.toLowerCase();
  }

  private randomNumber(max?: number) {
    let random = Math.random();
    return max ? random * max : random;
  }

  private randomColor(): string {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    if (r == 256 && r == g && g == b) {
      return this.randomColor();
    }
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

}
