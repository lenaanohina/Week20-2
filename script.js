const button = document
  .getElementById("searchBtn")
  .addEventListener("click", function () {
    // Сбросить предыдущие сообщения об ошибках и результаты
    document.getElementById("result").textContent = "";
    document.getElementById("error").textContent = "";

    const entity = document.getElementById("entity").value;
    const id = document.getElementById("idInput").value;

    document.getElementById("result").innerHTML = '<div class="loader"></div>';

    fetch(`https://swapi.dev/api/${entity}/${id}/`)
      .then((response) => {
        if (!response.ok || id > 10) {
          throw new Error(
            "Упс... Похоже, вы попали в параллельную вселенную Звездных войн, где властвует Ошибка 404. R2-D2 советует ввести другой номер или попробовать посетить эту страницу позже."
          );
        }
        return response.json();
      })
      .then((data) => {
        // Показать успешный результат
        document.getElementById("result").textContent = JSON.stringify(
          data.name
        );
      })
      .catch((error) => {
        // Показать ошибку
        document.getElementById("error").textContent =
          "Ошибка: " + error.message;
        document.querySelector(".loader").remove();
      })
      .finally(() => {
        // Очистить поле ввода
        document.getElementById("idInput").value = "";
      });
  });
