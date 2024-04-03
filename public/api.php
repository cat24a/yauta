<?php
/*
    YAUTA (a todo app)
    Copyright (C) 2024  cat24a

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/



header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: *");
header("Cache-Control: no-store");

require "dbdata.php";
$db = new PDO($db_dsn, $db_user, $db_pass);

$request = json_decode(gzdecode(file_get_contents("php://input")));
if(isset($request->user)) $request->user = base64_decode($request->user);
if(isset($request->pass)) $request->pass = base64_decode($request->pass);
if(isset($request->session)) $request->session = base64_decode($request->session);
if(isset($request->data)) $request->data = base64_decode($request->data);
if(isset($request->newpass)) $request->newpass = base64_decode($request->newpass);

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

    case "change_pass":
        if(isset($request->data)) {
            $query = $db->prepare("UPDATE `userdata` SET `data`=:data `pass`=:newpass WHERE `name`=:user AND `pass`=:pass AND `sess`=:session");
            $query->execute(["user" => $request->user, "pass" => $request->pass, "session" => $request->session, "data" => $request->data, "newpass" => $request->newpass]);
        } else {
            $query = $db->prepare("UPDATE `userdata` SET `pass`=:newpass WHERE `name`=:user AND `pass`=:pass AND `sess`=:session");
            $query->execute(["user" => $request->user, "pass" => $request->pass, "session" => $request->session, "newpass" => $request->newpass]);
        }
        if(!$query->rowCount()) {
            echo json_encode(["error" => "wrong_data"]);
            exit();
        }
        echo "{}";
        break;

    default:
        echo json_encode(["error" => "unknown_command"]);
}