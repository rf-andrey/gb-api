export const isValidCpf = (cpf: string) => {
  if (typeof cpf !== "string") return false;

  const cleanCpf = cpf.replace(/[^\d]+/g, "");

  if (cleanCpf.length !== 11 || !!cleanCpf.match(/(\d)\1{10}/)) return false;

  const cpfDigits = cleanCpf.split("").map((el) => +el);

  const rest = (count: number): number => {
    return (
      ((cpfDigits
        .slice(0, count - 12)
        .reduce((sum, el, index) => sum + el * (count - index), 0) *
        10) %
        11) %
      10
    );
  };

  return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
};
