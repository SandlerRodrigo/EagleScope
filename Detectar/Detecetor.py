import cv2
from cvzone.PoseModule import PoseDetector
import time

detector = PoseDetector()
cap = cv2.VideoCapture(0)

# Configurar a resolução da captura (opcional)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  # Largura padrão
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)  # Altura padrão

last_capture_time = time.time()
capture_interval = 10  # Intervalo mínimo entre capturas em segundos

while True:
    success, img = cap.read()
    if not success:
        break

    img = detector.findPose(img)
    lmList, bboxInfo = detector.findPosition(img, bboxWithHands=True)

    if bboxInfo and (time.time() - last_capture_time >= capture_interval):  # Verifica a detecção e o intervalo de tempo
        last_capture_time = time.time()
        timestamp = int(time.time())
        filename = f'detected_person_{timestamp}.png'
        cv2.imwrite(filename, img)
    
    cv2.imshow("Result", img)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):  # Pressione 'q' para sair do loop
        break

cap.release()
cv2.destroyAllWindows()
