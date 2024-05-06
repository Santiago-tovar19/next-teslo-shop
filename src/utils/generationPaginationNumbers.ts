export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  //si el numero de paginas es de 7 o menos se muestra todas sin los puntos suspensivos

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  //si la pagina actual esta entre las primeras tres paginas se muestra las primaras tres y las ultimas dos

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  //si la pagina actual esta entre las ultimas , se muestra las primeras dos y las ultimas tres

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  //si la pagina actual esta en otro lugar medio, queremos mostrar la primera pagina, puntos suspensivos, la pagina actual, la pagina anterior, la pagina siguiente y la ultima pagina

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};
