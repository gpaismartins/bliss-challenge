<?php

$request = strtok($_SERVER["REQUEST_URI"],'?');

switch ($request) {
    case '/' :
        require __DIR__ . '/views/index.php';
        break;
    case '' :
        require __DIR__ . '/views/index.php';
        break;
    case '/detail' :
        require __DIR__ . '/views/detail.php';
        break;
    default:
        require __DIR__ . '/views/404.php';
        break;
}