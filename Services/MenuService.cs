
using serviceApiRealestate.Models.DTOs;
using serviceApiRealestate.Repositories;

namespace serviceApiRealestate.Services
{
    public interface IMenuService
    {
        Task<MenuDataDto> GetAllMenuAsync(); // เปลี่ยนจาก List<AboutDto> เป็น AboutDataDto
    }

    public class MenuService : IMenuService
    {
        private readonly IMenuRepository _menuRepository;

        public MenuService(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        public async Task<MenuDataDto> GetAllMenuAsync() // เปลี่ยนจาก List<AboutDto> เป็น AboutDataDto
        {
            var menus = await _menuRepository.GetAllAsync();
            var menuList = menus.OrderBy(x => x.id_menu).Select(u => new MenuDto
            {
                id_menu = u.id_menu,
                menu_name = u.menu_name,
                menu_path = u.menu_path

            }).ToList();

            return new MenuDataDto
            {
                menu = menuList
            };
        }
    }
}