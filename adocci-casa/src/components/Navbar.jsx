import React from 'react';

const Navbar = ({ contadorAlertas }) => {
    return (
        <nav className="bg-adocci-dark border-b border-adocci-gold/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Lado Esquerdo: Branding */}
                    <div className="flex items-center gap-4">
                        <div className="bg-adocci-gold p-2 rounded-lg">
                            {/* Espaço para um Ícone (ex: uma casa ou um vaso) */}
                            <span className="text-adocci-dark text-xl font-bold">A</span>
                        </div>
                        <div>
                            <h1 className="text-adocci-gold font-black text-xl tracking-widest uppercase leading-none">
                                Adocci Casa
                            </h1>
                            <span className="text-gray-400 text-[10px] uppercase tracking-[0.2em]">
                                Premium Inventory
                            </span>
                        </div>
                    </div>

                    {/* Lado Central: Links de Navegação (Arquitetura da Informação) */}
                    <div className="hidden md:flex space-x-8">
                        <a href="#" className="text-adocci-gold border-b-2 border-adocci-gold px-1 pt-1 text-sm font-medium">
                            Dashboard
                        </a>
                        <a href="#" className="text-gray-300 hover:text-adocci-gold px-1 pt-1 text-sm font-medium transition-colors">
                            Estoque
                        </a>
                        <a href="#" className="text-gray-300 hover:text-adocci-gold px-1 pt-1 text-sm font-medium transition-colors">
                            Relatórios
                        </a>
                    </div>

                    {/* Lado Direito: Ações e Perfil */}
                    <div className="flex items-center gap-6">
                        {/* Indicador de Alerta (HCD: Feedback Visual) */}
                        <div className="relative cursor-pointer group">
                            <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] items-center justify-center text-white font-bold">
                                    {contadorAlertas > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[10px] items-center justify-center text-white font-bold">
                                                {contadorAlertas}
                                            </span>
                                        </span>
                                    )}
                                </span>
                            </span>
                            <span className="text-gray-400 group-hover:text-adocci-gold transition-colors">🔔</span>
                        </div>

                        {/* Usuário */}
                        <div className="flex items-center gap-4 pl-4 border-l border-gray-700">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-white font-medium">Admin Adocci</p>
                                <p className="text-[10px] text-gray-500">Gerente</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-adocci-gold to-yellow-600 flex items-center justify-center text-adocci-dark font-bold border-2 border-adocci-dark ring-2 ring-adocci-gold/30">
                                AD
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;