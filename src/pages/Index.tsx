import { useState, useEffect } from 'react';
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

export default function Index() {
  const { toast } = useToast();
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
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-4xl mx-auto space-y-8 animate-float">
            <div className="space-y-4">
              <div className="text-6xl mb-6">❄️</div>
              <h1 className="text-7xl md:text-8xl font-light text-primary tracking-wide">
                Анна & Дмитрий
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
                  14 февраля 2025
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Icon name="Clock" size={24} />
                <p className="text-xl md:text-2xl font-light">
                  15:00
                </p>
              </div>

              <div className="flex items-start justify-center gap-3 text-muted-foreground mt-6">
                <Icon name="MapPin" size={24} className="mt-1" />
                <div className="text-left">
                  <p className="text-xl md:text-2xl font-light">
                    Усадьба "Зимний сад"
                  </p>
                  <p className="text-lg text-muted-foreground/80">
                    Московская область, д. Снегири
                  </p>
                </div>
              </div>
            </div>
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
                  <p className="text-xl font-medium">15:00</p>
                  <p className="text-muted-foreground">
                    Официальная церемония бракосочетания в зимнем саду усадьбы
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
                  <p className="text-xl font-medium">16:00</p>
                  <p className="text-muted-foreground">
                    Совместная фотосессия в заснеженном парке усадьбы
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
                  <p className="text-xl font-medium">17:00</p>
                  <p className="text-muted-foreground">
                    Праздничный ужин, поздравления и танцы до утра
                  </p>
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
              Пожалуйста, подтвердите ваше присутствие до 1 февраля
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
              С любовью, Анна & Дмитрий
            </p>
            <div className="text-4xl">💙</div>
            <p className="text-muted-foreground">
              По вопросам: +7 (999) 123-45-67
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
