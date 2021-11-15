export const toErrorMap = (errors: []) => {
    const errorMap: Record<string, string> = {};

    console.log(errors)
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
}