<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: *");
header("Cache-Control: no-store");

$request = json_decode(gzdecode(file_get_contents("php://input")));
$db = new PDO("mysql:host=127.0.0.1;dbname=cataszet_todo", "cataszet_todo", "fM8dJ5A8ChueZjefXgNf");

if(isset($request->user)) $request->user = base64_decode($request->user);
if(isset($request->pass)) $request->pass = base64_decode($request->pass);
if(isset($request->session)) $request->session = base64_decode($request->session);
if(isset($request->data)) $request->data = base64_decode($request->data);

switch ($request->action) {
    case 'new_session':
        $query = $db->prepare("SELECT `data` FROM `userdata` WHERE `name`=:user AND `pass`=:pass");
        $query->execute(["user" => $request->user, "pass" => $request->pass]);
        $data = $query->fetchColumn();
        if(!$data) {
            echo json_encode(["error" => "wrong_data"]);
            exit();
        }
        $session = random_bytes(8);
        $query = $db->prepare("UPDATE `userdata` SET `sess`=:session WHERE `name`=:user AND `pass`=:pass");
        $query->execute(["user" => $request->user, "pass" => $request->pass, "session" => $session]);
        echo json_encode(["data" => base64_encode($data), "session" => base64_encode($session)]);
        break;

    case 'update':
        $query = $db->prepare("UPDATE `userdata` SET `data`=:data WHERE `name`=:user AND `pass`=:pass AND `sess`=:session");
        $query->execute(["user" => $request->user, "pass" => $request->pass, "session" => $request->session, "data" => $request->data]);
        if(!$query->rowCount()) {
            echo json_encode(["error" => "wrong_data"]);
            exit();
        }
        echo "{}";
        break;
    
    case "add_user":
        $query = $db->prepare("INSERT INTO `userdata`(`name`, `pass`, `data`) VALUES (:user, :pass, :data)");
        $query->execute(["user" => $request->user, "pass" => $request->pass, "data" => $request->data]);
        echo "{}";
        break;

    default:
        echo json_encode(["error" => "unknown_command"]);
}