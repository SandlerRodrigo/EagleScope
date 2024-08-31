import cv2
from cvzone.PoseModule import PoseDetector
import time
import boto3
import os

# Configurar boto3 para usar o cliente S3
s3_client = boto3.client('s3', region_name='us-east-2')  # Substitua 'your-region' pela região correta
bucket_name = 'demo-creatus'  # Substitua pelo nome do seu bucket

detector = PoseDetector()
cap = cv2.VideoCapture(0)

# Configurar a resolução da captura (opcional)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  # Largura padrão
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)  # Altura padrão

last_capture_time = time.time()
capture_interval = 5  # Intervalo mínimo entre capturas em segundos

while True:
    success, img = cap.read()
    if not success:
        break

    img = detector.findPose(img)
    lmList, bboxInfo = detector.findPosition(img, bboxWithHands=True)

    if bboxInfo and (time.time() - last_capture_time >= capture_interval):  # Verifica a detecção e o intervalo de tempo
        last_capture_time = time.time()
        timestamp = int(time.time())
        filename = f'detected_person_{timestamp}.jpeg'  # Alterado para JPEG
        cv2.imwrite(filename, img, [int(cv2.IMWRITE_JPEG_QUALITY), 90])  # Salva a imagem como JPEG

        try:
            # Fazer upload da imagem para o S3
            s3_client.upload_file(filename, bucket_name, filename)
            print(f'Uploaded {filename} to S3')

            # Gerar URL assinada
            url = s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': bucket_name, 'Key': filename},
                ExpiresIn=3600  # URL expira em 1 hora
            )
            print(f'URL for {filename}: {url}')
        except Exception as e:
            print(f'Error uploading {filename}: {e}')

        # Opcional: Remover a imagem local após upload
        os.remove(filename)
    
    cv2.imshow("Result", img)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):  # Pressione 'q' para sair do loop
        break

cap.release()
cv2.destroyAllWindows()