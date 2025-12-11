import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Snowflakes = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const weddingDate = new Date('2026-01-08T11:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-6 mt-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
        <div className="text-4xl md:text-5xl font-light text-primary">{timeLeft.days}</div>
        <div className="text-sm md:text-base text-muted-foreground mt-2">дней</div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
        <div className="text-4xl md:text-5xl font-light text-primary">{timeLeft.hours}</div>
        <div className="text-sm md:text-base text-muted-foreground mt-2">часов</div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
        <div className="text-4xl md:text-5xl font-light text-primary">{timeLeft.minutes}</div>
        <div className="text-sm md:text-base text-muted-foreground mt-2">минут</div>
      </div>
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
        <div className="text-4xl md:text-5xl font-light text-primary">{timeLeft.seconds}</div>
        <div className="text-sm md:text-base text-muted-foreground mt-2">секунд</div>
      </div>
    </div>
  );
};

export default function Index() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    guests: '',
    message: '',
    attendance: 'yes',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Спасибо за ответ! ❄️",
      description: `${formData.name}, мы будем рады видеть вас на нашей свадьбе!`,
    });
    setFormData({ name: '', guests: '', message: '', attendance: 'yes' });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Snowflakes />
      
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(240, 242, 250, 0.85), rgba(229, 222, 255, 0.9)), url('https://cdn.poehali.dev/projects/89b63c6e-c4d8-40f0-a7e1-633f77d58ea5/files/027b1bd0-b014-44a8-b2c9-fa2779f86599.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      <div className="relative z-10">
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={() => navigate('/guests')}
            className="bg-white/90 hover:bg-white text-primary shadow-lg backdrop-blur-sm"
            size="lg"
          >
            <Icon name="Users" size={20} className="mr-2" />
            Список гостей
          </Button>
        </div>

        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-float">
            <div className="space-y-4">
              <div className="text-6xl mb-6">❄️</div>
              <h1 className="text-7xl md:text-8xl font-light text-primary tracking-wide">
                Яна & Роман
              </h1>
              <div className="w-32 h-0.5 bg-primary/30 mx-auto my-8"></div>
              <p className="text-2xl md:text-3xl text-muted-foreground font-light">
                Приглашаем вас разделить с нами
              </p>
              <p className="text-3xl md:text-4xl text-foreground font-normal">
                самый важный день нашей жизни
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl space-y-6 mt-12">
              <div className="flex items-center justify-center gap-3 text-primary">
                <Icon name="Calendar" size={32} />
                <p className="text-3xl md:text-4xl font-light">
                  8 января 2026
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Icon name="Clock" size={24} />
                <p className="text-xl md:text-2xl font-light">
                  11:00
                </p>
              </div>

              <div className="flex items-start justify-center gap-3 text-muted-foreground mt-6">
                <Icon name="MapPin" size={24} className="mt-1" />
                <div className="text-left">
                  <p className="text-xl md:text-2xl font-light">
                    г. Ижевск
                  </p>
                  <p className="text-lg text-muted-foreground/80">
                    ул. Удмуртская, 196
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-primary/20">
                <p className="text-xl text-muted-foreground mb-4">До свадьбы осталось:</p>
                <Countdown />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl text-center mb-8 text-primary font-light">
              Как добраться
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-12">
              Место проведения находится в центре города Ижевска
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Car" size={28} className="text-primary" />
                    <CardTitle className="text-2xl text-primary font-light">
                      На автомобиле
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Адрес: г. Ижевск, ул. Удмуртская, 196
                  </p>
                  <p className="text-muted-foreground">
                    Удобный подъезд с центральных улиц города
                  </p>
                  <p className="font-medium text-foreground mt-4">
                    Бесплатная парковка для гостей
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Рекомендуем использовать навигатор для точного маршрута
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Bus" size={28} className="text-primary" />
                    <CardTitle className="text-2xl text-primary font-light">
                      На общественном транспорте
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Троллейбусы №1, 4, 12 — остановка "Удмуртская"
                  </p>
                  <p className="text-muted-foreground">
                    Автобусы №23, 30 — остановка "Удмуртская"
                  </p>
                  <p className="text-muted-foreground">
                    Такси до центра города — 10-15 минут
                  </p>
                  <div className="bg-accent/30 rounded-lg p-3 mt-4">
                    <p className="text-sm font-medium text-foreground">
                      💡 Нужна помощь с трансфером?
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Укажите в форме ответа, и мы поможем организовать
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-white/80 backdrop-blur-sm border-primary/20">
              <CardContent className="pt-6">
                <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3A1234567890&source=constructor"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Карта проезда"
                    className="w-full h-full"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-muted-foreground mb-2">Адрес:</p>
                  <p className="text-lg font-medium text-foreground">
                    г. Ижевск, ул. Удмуртская, 196
                  </p>
                  <Button variant="outline" className="mt-4" asChild>
                    <a href="https://yandex.ru/maps" target="_blank" rel="noopener noreferrer">
                      <Icon name="Navigation" size={18} className="mr-2" />
                      Построить маршрут
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 px-4 bg-white/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl text-center mb-16 text-primary font-light">
              Расписание дня
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm border-primary/20 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4 text-center">💍</div>
                  <CardTitle className="text-2xl text-center text-primary font-light">
                    Церемония
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="text-xl font-medium">11:00</p>
                  <p className="text-muted-foreground">
                    Церемония в зале бракосочетаний Управления ЗАГС Администрации г. Ижевска
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-primary/20 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4 text-center">📸</div>
                  <CardTitle className="text-2xl text-center text-primary font-light">
                    Фотосессия
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="text-xl font-medium">12:00</p>
                  <p className="text-muted-foreground">
                    Заснеженная Набережная г. Ижевска
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-primary/20 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4 text-center">🥂</div>
                  <CardTitle className="text-2xl text-center text-primary font-light">
                    Банкет
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <p className="text-xl font-medium">15:00</p>
                  <p className="text-muted-foreground">
                    Праздничный ужин, баня на дровах, сибирский чан, караоке, поздравления и танцы до утра в семейном кругу
                  </p>
                  <div className="flex items-start justify-center gap-2 text-muted-foreground/80 mt-4 pt-4 border-t border-primary/10">
                    <Icon name="MapPin" size={18} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      д. Болгуры, ул. Полевая, 13
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl text-center mb-8 text-primary font-light">
              Подтверждение
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-12">
              Пожалуйста, подтвердите ваше присутствие до 31 декабря 2025
            </p>
            
            <Card className="bg-white/80 backdrop-blur-sm border-primary/20 shadow-2xl">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg">
                      Ваше имя
                    </Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="text-lg py-6"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-lg">
                      Количество гостей
                    </Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      placeholder="2"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      required
                      className="text-lg py-6"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-lg">Сможете ли вы присутствовать?</Label>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant={formData.attendance === 'yes' ? 'default' : 'outline'}
                        onClick={() => setFormData({ ...formData, attendance: 'yes' })}
                        className="flex-1 py-6 text-lg"
                      >
                        Да, буду
                      </Button>
                      <Button
                        type="button"
                        variant={formData.attendance === 'no' ? 'default' : 'outline'}
                        onClick={() => setFormData({ ...formData, attendance: 'no' })}
                        className="flex-1 py-6 text-lg"
                      >
                        К сожалению, нет
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-lg">
                      Пожелания или комментарии
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Особые пожелания по питанию, вопросы..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-32 text-lg"
                    />
                  </div>

                  <Button type="submit" className="w-full py-6 text-xl" size="lg">
                    Отправить ответ
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="py-12 text-center bg-white/40 backdrop-blur-sm">
          <div className="space-y-4">
            <p className="text-2xl text-primary font-light">
              С любовью, Яна & Роман
            </p>
            <div className="text-4xl">💙</div>
            <p className="text-muted-foreground">
              По вопросам: +7 (912) 020-48-11
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}