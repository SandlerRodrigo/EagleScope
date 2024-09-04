import cv2
import numpy as np
import time

# Carregar o modelo YOLO pré-treinado e suas configurações
net = cv2.dnn.readNet("yolov4.weights", "yolov4.cfg")
layer_names = net.getLayerNames()

# Corrigido: Acessando diretamente os índices das camadas de saída
unconnected_layers = net.getUnconnectedOutLayers()
output_layers = [layer_names[i - 1] for i in unconnected_layers]

cap = cv2.VideoCapture(0)

cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

last_capture_time = time.time()
capture_interval = 10  # Intervalo mínimo entre capturas em segundos

while True:
    success, img = cap.read()
    if not success:
        break

    height, width, channels = img.shape

    # Pré-processamento da imagem para o YOLO
    blob = cv2.dnn.blobFromImage(img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    # Lista para armazenar as informações de detecção
    class_ids = []
    confidences = []
    boxes = []

    # Loop pelas detecções
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5 and class_id == 0:  # Classe 0 é 'person' no COCO dataset
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)

                # Coordenadas da caixa delimitadora
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)

                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    # Aplicar Non-Maximum Suppression para suprimir caixas delimitadoras redundantes
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

    # Processar as detecções
    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            label = str("Person")
            confidence = confidences[i]
            color = (0, 255, 0)
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
            cv2.putText(img, f'{label} {int(confidence * 100)}%', (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

            # Verificar o intervalo de tempo e salvar a imagem
            if time.time() - last_capture_time >= capture_interval:
                last_capture_time = time.time()
                timestamp = int(time.time())
                filename = f'detected_person_{timestamp}.png'
                cv2.imwrite(filename, img)

    cv2.imshow("Result", img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
