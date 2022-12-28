using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cadastro_pacientes.Migrations
{
    public partial class InitModels2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "FICHA",
                table: "paciente",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FICHA",
                table: "paciente");
        }
    }
}
