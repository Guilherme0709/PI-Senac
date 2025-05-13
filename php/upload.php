<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $localizacao = $_POST["localizacao"];
    $metragem = $_POST["metragem"];
    $valor = $_POST["valor"];

    $escritura = $_FILES["escritura"]["name"];
    $foto = $_FILES["foto"]["name"];

    move_uploaded_file($_FILES["escritura"]["tmp_name"], "uploads/" . $escritura);
    move_uploaded_file($_FILES["foto"]["tmp_name"], "uploads/" . $foto);

    echo "Dados enviados com sucesso!";
} else {
    echo "Método inválido.";
}
?>