import json
import smtplib
import os
import psycopg2
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from pydantic import BaseModel, Field, EmailStr

class RSVPRequest(BaseModel):
    name: str = Field(..., min_length=1)
    guests: int = Field(..., ge=1, le=20)
    email: EmailStr
    message: str = ""

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправка email-уведомлений о подтверждении присутствия гостей на свадьбу
    Args: event - запрос с данными гостя (имя, количество гостей, email, сообщение)
          context - контекст выполнения функции
    Returns: Ответ с результатом отправки
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    rsvp = RSVPRequest(**body_data)
    
    # Сохраняем в базу данных
    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO guests (name, guests_count, email, message) VALUES (%s, %s, %s, %s)",
            (rsvp.name, rsvp.guests, rsvp.email, rsvp.message)
        )
        conn.commit()
        cur.close()
        conn.close()
    
    # Получаем настройки email из переменных окружения
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    sender_email = os.environ.get('SENDER_EMAIL')
    sender_password = os.environ.get('SENDER_PASSWORD')
    recipient_email = os.environ.get('RECIPIENT_EMAIL')
    
    if not all([sender_email, sender_password, recipient_email]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email не настроен. Свяжитесь с администратором.'}),
            'isBase64Encoded': False
        }
    
    # Формируем письмо
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = f'Подтверждение участия: {rsvp.name}'
    
    body = f"""
Новое подтверждение участия на свадьбе!

Имя гостя: {rsvp.name}
Количество гостей: {rsvp.guests}
Email для связи: {rsvp.email}

Сообщение:
{rsvp.message if rsvp.message else 'Не указано'}

---
Отправлено с сайта приглашения на свадьбу
    """
    
    msg.attach(MIMEText(body, 'plain', 'utf-8'))
    
    # Отправляем email
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'success': True, 'message': 'Ваше подтверждение отправлено!'}),
        'isBase64Encoded': False
    }