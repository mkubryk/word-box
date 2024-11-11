<?php 

class JsonUtil {

    static function jsonResponse($message, $data = null)
    {
        // Désactiver le tampon de sortie
        if (ob_get_length()) {
            ob_clean();
        }

        // Envoyer les en-têtes JSON
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(200);

        // Envoyer la réponse JSON
        echo json_encode(['message' => $message, 'data' => $data]);

        // Terminer le script
        exit();
    }
}
?>
