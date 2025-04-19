"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SelectBasic } from "@/components/ui/select-basic";
import { ArrowRight, Plus, Zap } from "lucide-react";
import React, { useState } from "react";

export default function ComponentsExamplePage() {
  const [progress, setProgress] = useState(45);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    category: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
    };

    if (!formValues.name) {
      errors.name = "İsim alanı zorunludur";
    }

    if (!formValues.email) {
      errors.email = "E-posta alanı zorunludur";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Geçerli bir e-posta adresi giriniz";
    }

    setFormErrors(errors);
    return !errors.name && !errors.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form başarıyla gönderildi!");
      setProgress(100);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 pb-4 border-b-2 border-black">
        UI Bileşenleri Örnekleri
      </h1>

      {/* Buttons Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Butonlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="brutalist" className="p-6">
            <CardTitle className="mb-4">Neobrutalist Butonlar</CardTitle>
            <div className="grid grid-cols-1 gap-4">
              <Button variant="brutalist" className="w-full">
                Standart Buton
              </Button>
              <Button variant="brutalistPrimary" className="w-full">
                Ana Buton
              </Button>
              <Button
                variant="brutalist"
                leftIcon={<Plus size={16} />}
                className="w-full"
              >
                İkon ile Buton
              </Button>
              <Button variant="brutalistOutline" className="w-full">
                Outline Buton
              </Button>
              <Button variant="brutalist" disabled className="w-full">
                Devre Dışı Buton
              </Button>
            </div>
          </Card>

          <Card variant="brutalist" className="p-6">
            <CardTitle className="mb-4">Buton Boyutları</CardTitle>
            <div className="flex flex-col space-y-4">
              <Button variant="brutalistPrimary" size="sm">
                Küçük Buton
              </Button>
              <Button variant="brutalistPrimary" size="default">
                Normal Buton
              </Button>
              <Button variant="brutalistPrimary" size="lg">
                Büyük Buton
              </Button>
              <Button variant="brutalistPrimary" size="xl">
                Çok Büyük Buton
              </Button>
              <Button variant="brutalistPrimary" size="icon">
                <Plus />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Kartlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="brutalist">
            <CardHeader>
              <CardTitle>Neobrutalist Kart</CardTitle>
              <CardDescription>
                Keskin köşeli ve gölgeli tasarım
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Bu kart bileşeni, projenizdeki neobrutalist tasarım stiline
                uygun olarak oluşturulmuştur.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="brutalist" size="sm">
                İşlem Yap
              </Button>
            </CardFooter>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <CardTitle>Outline Kart</CardTitle>
              <CardDescription>Sadece kenarlıklı versiyon</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Daha minimal bir görünüm için kenarlıklı ama gölgesiz versiyon.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="brutalistOutline" size="sm">
                İşlem Yap
              </Button>
            </CardFooter>
          </Card>

          <Card variant="shadow">
            <CardHeader>
              <CardTitle>Shadow Kart</CardTitle>
              <CardDescription>Yumuşak gölgeli tasarım</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Daha modern bir görünüm sunan yumuşak gölgeli kart versiyonu.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="brutalistPrimary" size="sm">
                İşlem Yap
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Form Elements Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Form Elemanları</h2>
        <Card variant="brutalist" className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-bold">
                  İsim <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  variant="brutalist"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  placeholder="İsminizi giriniz"
                  aria-invalid={!!formErrors.name}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
                <p className="mt-1 text-sm text-gray-700 font-medium">
                  Tam adınızı giriniz
                </p>
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-bold">
                  E-posta <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  variant="brutalist"
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="E-posta adresiniz"
                  aria-invalid={!!formErrors.email}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-bold"
                >
                  Kategori
                </label>
                <SelectBasic
                  id="category"
                  variant="brutalist"
                  name="category"
                  value={formValues.category}
                  onChange={handleSelectChange}
                >
                  <option value="">Kategori Seçin</option>
                  <option value="sosyal-medya">Sosyal Medya</option>
                  <option value="blog">Blog</option>
                  <option value="pazarlama">Pazarlama</option>
                </SelectBasic>
              </div>

              <div className="mb-5">
                <Input variant="outline" placeholder="Outline Input" />
              </div>
            </div>
            <div className="mt-6">
              <Button
                variant="brutalistPrimary"
                type="submit"
                rightIcon={<ArrowRight size={16} />}
              >
                Formu Gönder
              </Button>
            </div>
          </form>
        </Card>
      </section>

      {/* Badges Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Rozetler (Badges)</h2>
        <Card variant="brutalist" className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Standart Rozetler</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Varsayılan</Badge>
                <Badge variant="secondary">İkincil</Badge>
                <Badge variant="destructive">Tehlike</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Özel Rozetler</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="brutalist">Neobrutalist</Badge>
                <Badge variant="primary">Ana Rozet</Badge>
                <Badge variant="hashtag">#sosyalmedya</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Rozet Boyutları</h3>
              <div className="flex items-center gap-2">
                <Badge variant="primary" size="sm">
                  Küçük
                </Badge>
                <Badge variant="primary" size="default">
                  Normal
                </Badge>
                <Badge variant="primary" size="lg">
                  Büyük
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Progress Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">İlerleme Çubukları</h2>
        <Card variant="brutalist" className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Varsayılan İlerleme Çubuğu
              </h3>
              <Progress value={progress} className="mb-2" />
              <p className="text-sm text-gray-500">İlerleme: {progress}%</p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="brutalist"
                  size="sm"
                  onClick={() => setProgress((prev) => Math.max(0, prev - 10))}
                >
                  Azalt
                </Button>
                <Button
                  variant="brutalistPrimary"
                  size="sm"
                  onClick={() =>
                    setProgress((prev) => Math.min(100, prev + 10))
                  }
                >
                  Artır
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Neobrutalist İlerleme Çubuğu
              </h3>
              <Progress variant="brutalist" value={progress} className="mb-2" />
              <div className="mt-4 flex gap-2">
                <Button
                  variant="brutalist"
                  size="sm"
                  onClick={() => setProgress(0)}
                >
                  Sıfırla
                </Button>
                <Button
                  variant="brutalistPrimary"
                  size="sm"
                  onClick={() => setProgress(100)}
                >
                  Tamamla
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Usage Example Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Kullanım Örneği</h2>
        <Card variant="brutalist" className="p-6">
          <CardHeader>
            <CardTitle>İçerik Oluşturma</CardTitle>
            <CardDescription>
              Sosyal medyanız için içerik oluşturun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="mb-5">
                <label
                  htmlFor="platform"
                  className="block mb-2 text-sm font-bold"
                >
                  Platform <span className="text-red-500">*</span>
                </label>
                <SelectBasic id="platform" variant="brutalist">
                  <option value="">Platform Seçin</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                </SelectBasic>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="content-desc"
                  className="block mb-2 text-sm font-bold"
                >
                  İçerik Açıklaması <span className="text-red-500">*</span>
                </label>
                <Input
                  id="content-desc"
                  variant="brutalist"
                  placeholder="İçeriğinizi kısaca açıklayın"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="hashtag">#pazarlama</Badge>
                <Badge variant="hashtag">#sosyalmedya</Badge>
                <Badge variant="hashtag">#içeriküretimi</Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="brutalistPrimary" rightIcon={<Zap size={16} />}>
              İçerik Oluştur
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
