const validCpf = (cpf: string): boolean => {
  if (!cpf || cpf.length !== 11) return false;

  let number: string;
  let digit: string;
  let sum: number;
  let i: number;
  let result: number;
  let equals: number;
  equals = 1;

  for (i = 0; i < cpf.length - 1; i += 1) {
    if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
      equals = 0;
      break;
    }
  }

  if (equals) return false;

  number = cpf.substring(0, 9);
  digit = cpf.substring(9);
  sum = 0;

  for (i = 10; i > 1; i -= 1) {
    let stringConvert = number.toString();
    let charAtResult = stringConvert.charAt(10 - i);
    sum += parseInt(charAtResult) * i;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(digit.charAt(0), 10)) return false;

  number = cpf.substring(0, 10);
  sum = 0;

  for (i = 11; i > 1; i -= 1) {
    let stringConvert = number.toString();
    let charAtResult = stringConvert.charAt(11 - i);
    sum += parseInt(charAtResult) * i;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(digit.charAt(1), 10)) return false;

  return true;
};

const validCnpj = (cnpj: string): boolean => {
  if (!cnpj || cnpj.length !== 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  )
    return false;

  // Valida DVs
  let length = cnpj.length - 2;
  let body = cnpj.substring(0, length);
  const digit = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(body.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digit.charAt(0))) return false;

  length = length + 1;
  body = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(body.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digit.charAt(1))) return false;

  return true;
};

export { validCnpj, validCpf };
