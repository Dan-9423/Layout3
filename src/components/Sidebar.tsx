import { useState } from 'react';
import { Plus, Minus, LayoutDashboard, Users, Settings, BarChart2, FileText, LogOut, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

interface MenuItem {
  title: string;
  icon: JSX.Element;
  path?: string;
  submenu?: { title: string; path: string }[];
}

export default function Sidebar() {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>('Dashboard');
  const [isExpanded, setIsExpanded] = useState(true);

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const menuItems: MenuItem[] = [
    {
      title: 'Início',
      icon: <Home className="w-5 h-5" />,
      path: '/'
    },
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      submenu: [
        { title: 'Overview', path: '/overview' },
        { title: 'Analytics', path: '/analytics' },
        { title: 'Reports', path: '/reports' },
      ],
    },
    {
      title: 'Users',
      icon: <Users className="w-5 h-5" />,
      submenu: [
        { title: 'All Users', path: '/users' },
        { title: 'User Groups', path: '/user-groups' },
        { title: 'Permissions', path: '/permissions' },
      ],
    },
    {
      title: 'Analytics',
      icon: <BarChart2 className="w-5 h-5" />,
      submenu: [
        { title: 'Statistics', path: '/statistics' },
        { title: 'Performance', path: '/performance' },
        { title: 'Metrics', path: '/metrics' },
      ],
    },
    {
      title: 'Reports',
      icon: <FileText className="w-5 h-5" />,
      submenu: [
        { title: 'Daily', path: '/daily-reports' },
        { title: 'Weekly', path: '/weekly-reports' },
        { title: 'Monthly', path: '/monthly-reports' },
      ],
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/settings'
    },
  ];

  return (
    <div className={cn(
      "bg-white dark:bg-[#1C1C1C] shadow-lg h-screen rounded-2xl flex flex-col transition-all duration-300",
      isExpanded ? "w-64" : "w-20"
    )}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-center">
          <Logo iconOnly={!isExpanded} />
        </div>
      </div>

      {/* Collapse Button and Date */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
        {isExpanded && (
          <span className="text-sm text-gray-500 dark:text-gray-400">{currentDate}</span>
        )}
      </div>

      {/* Menu Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav>
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.path ? (
                <Link
                  to={item.path}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors duration-100',
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-[#242424] hover:text-blue-600 text-gray-700 dark:text-gray-300'
                  )}
                  title={!isExpanded ? item.title : undefined}
                >
                  {item.icon}
                  {isExpanded && <span className="font-medium">{item.title}</span>}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => isExpanded && setExpandedMenu(expandedMenu === item.title ? null : item.title)}
                    className={cn(
                      'w-full flex items-center justify-between p-3 rounded-lg mb-1 transition-colors duration-100',
                      expandedMenu === item.title
                        ? 'bg-blue-50 dark:bg-[#242424] text-blue-600 dark:text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-[#242424] hover:text-blue-600 text-gray-700 dark:text-gray-300'
                    )}
                    title={!isExpanded ? item.title : undefined}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {isExpanded && <span className="font-medium">{item.title}</span>}
                    </div>
                    {isExpanded && item.submenu && (
                      expandedMenu === item.title ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )
                    )}
                  </button>
                  {isExpanded && item.submenu && expandedMenu === item.title && (
                    <div className="ml-4 mb-2 overflow-hidden animate-slideDown">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className={cn(
                            'block w-full text-left p-2 pl-8 rounded-lg mb-1 transition-colors duration-100',
                            location.pathname === sub.path
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-100 dark:hover:bg-[#242424] hover:text-blue-600 text-gray-600 dark:text-gray-400'
                          )}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Section with Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/10",
            !isExpanded && "px-0"
          )}
          title={!isExpanded ? "Logout" : undefined}
        >
          <LogOut className="h-4 w-4" />
          {isExpanded && "Logout"}
        </Button>
      </div>
    </div>
  );
}