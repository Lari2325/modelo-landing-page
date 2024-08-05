<?php
header("Content-type: text/html; charset=utf-8");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

$mail = new PHPMailer(true);

$nome = filter_input(INPUT_POST, 'nome');
$email = filter_input(INPUT_POST, 'email');
$telefone = filter_input(INPUT_POST, 'telefone');
$assunto = filter_input(INPUT_POST, 'assunto');
$mensagem = filter_input(INPUT_POST, 'mensagem');
    
$emailConstruido = "<b>Contato do website:</b><br><b>
Nome:</b> $nome<br><b>
E-mail:</b> $email<br><b>
Telefone:</b> $telefone<br><b>
Assunto:</b> $assunto<br><b>
Mensagem:</b> $mensagem";

try {
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();
    $mail->Host = 'smtp.grupozntt.com.br';
    $mail->SMTPAuth = true;
    $mail->Port = 587;
    $mail->Username = 'send@grupozntt.com.br';
    $mail->Password = 'sucesso2018';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Habilita TLS

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Configurações do e-mail
    $mail->CharSet = 'UTF-8';
    $mail->setFrom('send@grupozntt.com.br', 'Nome do website');
    
    // Adicionando os destinatários
    $mail->addAddress('larissazntt@gmail.com', 'Larissa ZNTT'); 
    $mail->addAddress('larissa.rocha@grupozntt.com.br', 'Larissa Rocha');

    $mail->isHTML(true);
    $mail->Subject = 'Nome do website - Website';
    $mail->Body    = $emailConstruido;

    if ($mail->send()) {
        header('Location: ../?formulario=success');
    } else {
        header('Location: ../?formulario=error');
    }
} catch (Exception $e) {
    echo "Erro ao enviar mensagem: {$mail->ErrorInfo}";
}