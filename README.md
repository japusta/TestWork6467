# Abelohost Shop

A demo e‑commerce front‑end built with Next.js (App Router), TypeScript, Zustand, Axios and SCSS‑modules, powered by the public DummyJSON API.  

---

## Что реализовано

1. **Аутентификация**  
   - Страница `/login` с формой (username + password), минимальная валидация (не пустое, ≥3 символов).  
   - Использование JWT: при успешном логине сохраняем `accessToken` и данные пользователя в Zustand‑хуке `useAuth` + `localStorage` (с `persist`).  
   - При ошибке показываем понятное сообщение.  
   - При удачном логине делаем редирект на главную страницу.

2. **Главная страница продуктов**  
   - SSR (Server Components) для SEO и скорости: запрос к API в `app/page.tsx`.  
   - При загрузке спиннер/скелетон-карточки (клиентские `Suspense`‑fallback или клиентский Skeleton).  
   - Отображение 12 товаров: картинка (`next/image`), название, категория, цена.  
   - Для залогиненного пользователя на каждой карточке появляется кнопка **Add to cart** (функционал - добавление в Zustand‑корзину).

3. **Корзина**  
   - **useCart** (Zustand‑store) с методами `addItem`, `removeItem`, `clearCart`, `totalCount`, `totalPrice`.  
   - **Персист**: каждый раз при изменении корзины записываем её в `localStorage` под ключом `dummyjson-cart‑<userId>` или `…‑guest`.  
   - При смене пользователя (или на старте) загружаем корзину из `localStorage`.  
   - Страница `/cart` с перечнем товаров, кнопками `+`, `–` и «Очистить корзину».

4. **Header & Footer**  
   - **Header**:  
     - Логотип слева, по центру (на десктопе) меню ссылок, справа логин/имя+logout + иконка корзины с бейджем.  
     - На мобильных: «бургер» => дропдаун со всеми навигацией + auth + cart + переключатель темы.  
   - **Footer**:  
     - Текущий год + «Logged as {email}» для залогиненных, иначе только год.

5. **Тёмная/светлая тема**  
   - Хук `useTheme` + CSS‑custom‑properties.  
   - Кнопка‑переключатель в шапке.  
   - Предзагрузка на клиенте, корректная гидрация, fallback для SSR.

---

## Дополнительно

- **Адаптивность**:  
  — Сетка продуктов резиновая, бургер‑меню для мобильных и планшетов, точки‑медиа на 768px.  
- **Статическая оптимизация**:  
  — Использован ISR (`next: { revalidate: 60 }`) для продуктов, чтобы не дергать API при каждом запросе.  
- **Цепочки загрузки**:  
  — Skeleton‑карточки на клиенте в Suspense, spinner при submit на логине, placeholder при очистке корзины.  
- **Качество кода и линтинг**:  
  — **Prettier**, **ESLint**, **Stylelint** настроены для единообразия стилей и синтаксиса.  
- **TypeScript**:  
  — Строгая типизация API‑ответов (`AuthResponse`, `Product`, `User`, `CartItem`).

---

## Запуск проекта

```bash
# 1. Клонируем
git clone https://github.com/japusta/TestWork6467.git
cd TestWork6467

# 2. Устанавливаем зависимости
npm install

# 3. Локально
npm run dev
# Приложение будет доступно на http://localhost:3000
```
# 4. Скрипты

Запустить в режиме разработки
```bash
npm run dev
```

Сборка для production
```bash
npm run build	
```

Запустить production‑сборку
```bash
npm start	
```

Проверить JS/TS через ESLint
```bash
npm run lint	
```

Проверить SCSS через Stylelint
```bash
npm run style:lint	
```

```bash
npm run style:fix	Исправить SCSS — автоформат (если настроено)
```

```bash
npm run format	Прогонка Prettier по всему коду
```
