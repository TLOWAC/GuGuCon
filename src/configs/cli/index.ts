import gradient from 'gradient-string';

export function awesomeCli() {
        const coolGradient = gradient('red', 'blue', 'green');

        // TODO: env > author 로 변경.
        const coolString = coolGradient(String.raw`

  /$$$$$$$$ /$$        /$$$$$$  /$$      /$$  /$$$$$$   /$$$$$$ 
 |__  $$__/| $$       /$$__  $$| $$  /$ | $$ /$$__  $$ /$$__  $$
    | $$   | $$      | $$  \ $$| $$ /$$$| $$| $$  \ $$| $$  \__/
    | $$   | $$      | $$  | $$| $$/$$ $$ $$| $$$$$$$$| $$      
    | $$   | $$      | $$  | $$| $$$$_  $$$$| $$__  $$| $$      
    | $$   | $$      | $$  | $$| $$$/ \  $$$| $$  | $$| $$    $$
    | $$   | $$$$$$$$|  $$$$$$/| $$/   \  $$| $$  | $$|  $$$$$$/
    |__/   |________/ \______/ |__/     \__/|__/  |__/ \______/     

    Made By ChangHun Lee
      `);
        return coolString;
}
