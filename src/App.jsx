import React, { useState } from 'react'

const App = () => {
  const [activeTab, setActiveTab] = useState('Домой')
  const [cart, setCart] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const products = [
    {
      id: 1,
      name: 'Наушники Sony',
      price: 199,
      image: 'https://cdn1.ozone.ru/s3/multimedia-q/c600/6014750666.jpg',
    },
    {
      id: 2,
      name: 'Часы Apple Watch',
      price: 299,
      image:
        'https://avatars.mds.yandex.net/i?id=ae22ffae13abdbc8fda7c375441714c8a03ba7ab-10547508-images-thumbs&n=13',
    },
    {
      id: 3,
      name: 'Ноутбук Acer',
      price: 49,
      image:
        'https://avatars.mds.yandex.net/get-mpic/5319505/img_id8179338515758568570.jpeg/orig',
    },
    {
      id: 4,
      name: 'Механическая клавиатура Razer',
      price: 129,
      image:
        'https://avatars.mds.yandex.net/i?id=893f90c09ba68d1ee41a69cdd04d7b1576888cd5-11938745-images-thumbs&n=13',
    },
  ]

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === id)
      if (existingItem && existingItem.quantity > 1) {
        // Уменьшаем количество
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
      } else {
        // Удаляем товар полностью, если quantity = 1
        return prev.filter((item) => item.id !== id)
      }
    })
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const navTabs = ['Домой', 'Товары', 'Корзина', 'О сайте', 'Контакты']

  return (
    <div className="bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                className="text-2xl font-bold text-indigo-600"
                onClick={() => setActiveTab('Домой')}
              >
                TechStore
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize font-medium transition-colors ${activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-700 hover:text-indigo-500'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('Корзина')}
                className="relative p-2 text-gray-700 hover:text-indigo-600"
                aria-label="Cart"
              >
                Корзина
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {navTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setIsMenuOpen(false)
                  }}
                  className={`block w-full text-left py-2 capitalize font-medium ${activeTab === tab ? 'text-indigo-600' : 'text-gray-700'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto min-h-[calc(100vh-280px)] px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'Домой' && (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Добро пожаловать в TechStore
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Откройте для себя новейшие технологические продукты высшего
              качества по потрясающим ценам
            </p>
            <button
              onClick={() => setActiveTab('Товары')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              К продуктам
            </button>
          </div>
        )}

        {activeTab === 'Товары' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Наши продукты
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col hover:scale-110"
                >
                  <img
                    src={product.image.trim()}
                    alt={product.name}
                    onClick={() => addToCart(product)}
                    className="h-48 w-full object-cover cursor-pointer"
                  />
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-2xl font-bold text-indigo-600 mb-4">
                        ${product.price}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors mt-4"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Корзина' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Твоя корзина
            </h2>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Добавьте товары</p>
                <button
                  onClick={() => setActiveTab('Товары')}
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image.trim()}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-indigo-600 font-bold">
                          ${item.price} ({item.quantity} шт.)
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Убрать
                    </button>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Цена:</span>
                    <span>${totalPrice}</span>
                  </div>
                  <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'О сайте' && (
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">О нас</h2>
            <p className="text-lg text-gray-600 mb-4">
              Компания TechStore была основан в 2026 году с целью предоставления
              клиентам по всему миру лучших технологических продуктов.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Мы тщательно отбираем каждый продукт, чтобы обеспечить нашим
              клиентам качество, надёжность и выгодную цену.
            </p>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600">100+</div>
                <div className="text-gray-600">Продуктов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">50K+</div>
                <div className="text-gray-600">Довольных клиентов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">24/7</div>
                <div className="text-gray-600">Поддержка</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Контакты' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Связаться с нами
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Твоё имя"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Почта
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="user@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ваше обращение..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">TechStore</h3>
            <p className="text-gray-400 mb-4">
              Ваш надежный партнер в сфере высокотехнологичной продукции
            </p>
            <div className="block sm:flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 block sm:flex hover:text-white transition-colors"
              >
                Политика конфиденциальности
              </a>
              <a
                href="#"
                className="text-gray-400 block sm:flex hover:text-white transition-colors"
              >
                Условия обслуживания
              </a>
              <a
                href="#"
                className="text-gray-400 block sm:flex hover:text-white transition-colors"
              >
                Поддержка
              </a>
            </div>
            <p className="text-gray-500 mt-6">
              © 2026 TechStore. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App