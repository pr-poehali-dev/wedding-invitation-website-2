import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Guest {
  id: number;
  name: string;
  guests_count: number;
  email: string;
  message: string;
  created_at: string;
}

interface GuestsData {
  guests: Guest[];
  total_responses: number;
  total_guests_count: number;
}

const GuestsList = () => {
  const [data, setData] = useState<GuestsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/f171397e-115b-4cc1-a5fa-4a37650e7a28');
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-blue-50">
        <div className="text-2xl text-primary">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-blue-50">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-primary mb-4">
            Список гостей
          </h1>
          <div className="flex justify-center gap-8 mt-8">
            <Card className="bg-white/80 backdrop-blur-sm border-primary/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-light text-primary">{data?.total_responses || 0}</div>
                <div className="text-muted-foreground mt-2">Подтверждений</div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-primary/20">
              <CardContent className="pt-6">
                <div className="text-4xl font-light text-primary">{data?.total_guests_count || 0}</div>
                <div className="text-muted-foreground mt-2">Всего гостей</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {data?.guests.map((guest) => (
            <Card key={guest.id} className="bg-white/80 backdrop-blur-sm border-primary/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary font-light flex items-center gap-2">
                  <Icon name="User" size={24} />
                  {guest.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Users" size={20} />
                  <span>Гостей: {guest.guests_count}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Mail" size={20} />
                  <span className="break-all">{guest.email}</span>
                </div>
                {guest.message && (
                  <div className="mt-4 p-4 bg-accent/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Icon name="MessageCircle" size={20} className="mt-0.5 flex-shrink-0 text-primary" />
                      <p className="text-muted-foreground italic">{guest.message}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground/60 mt-4 pt-4 border-t border-primary/10">
                  <Icon name="Calendar" size={16} />
                  <span>{new Date(guest.created_at).toLocaleString('ru-RU')}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data?.guests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-2xl text-muted-foreground">Пока нет подтверждений</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestsList;
