import json
import os
import psycopg2
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Получение списка всех подтвердивших гостей из базы данных
    Args: event - HTTP запрос
          context - контекст выполнения
    Returns: Список гостей с их данными
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'База данных не настроена'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute("""
        SELECT id, name, guests_count, email, message, created_at 
        FROM guests 
        ORDER BY created_at DESC
    """)
    
    rows = cur.fetchall()
    
    guests: List[Dict[str, Any]] = []
    total_guests_count = 0
    
    for row in rows:
        guest = {
            'id': row[0],
            'name': row[1],
            'guests_count': row[2],
            'email': row[3],
            'message': row[4],
            'created_at': row[5].isoformat() if row[5] else None
        }
        guests.append(guest)
        total_guests_count += row[2]
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'guests': guests,
            'total_responses': len(guests),
            'total_guests_count': total_guests_count
        }),
        'isBase64Encoded': False
    }
