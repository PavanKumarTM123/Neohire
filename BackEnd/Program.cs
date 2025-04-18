using JobPortalForFreshers.BusinessLayer;
using JobPortalForFreshers.DataLayer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.DependencyInjection;
using System.Text;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace JobPortalForFreshers
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddScoped<ApplyJobDAL>();
            builder.Services.AddScoped<ApplyJobBL>();
            builder.Services.AddScoped<RegisterFormBL>();
            builder.Services.AddScoped<SqlDBServer>();

            // Add Swagger for API documentation
            builder.Services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "JobPortal API", Version = "v1" });

                // Enable File Upload in Swagger
                options.OperationFilter<SwaggerFileUploadFilter>();
                options.SchemaGeneratorOptions.UseAllOfToExtendReferenceSchemas = false;
            });

            // JWT Authentication Configuration
            var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);
            builder.Services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(key)
                    };
                });

            // Add Authorization
            builder.Services.AddAuthorization();

            // Configure CORS - Make sure to add CORS before building the app
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy => policy.AllowAnyOrigin() // Allow all origins
                                  .AllowAnyMethod() // Allow all methods (GET, POST, etc.)
                                  .AllowAnyHeader()); // Allow all headers
            });

            // Build the app
            var app = builder.Build();

            

            // Enable serving static files if required (like resumes)
            app.UseStaticFiles();

            // Apply CORS policy before the app is built
            app.UseCors("AllowAll");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Routing, Authentication, and Authorization Middleware
            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseAuthentication(); // Enable Authentication Middleware
            app.UseAuthorization();

            // Map controllers
            app.MapControllers();

            // Run the application
            app.Run();
        }
    }

    // Custom Swagger Filter for File Uploads (if any file upload functionality is required)
    public class SwaggerFileUploadFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var fileParams = context.ApiDescription.ParameterDescriptions
                .Where(p => p.Type == typeof(IFormFile));

            if (fileParams.Any())
            {
                operation.RequestBody = new OpenApiRequestBody
                {
                    Content = new Dictionary<string, OpenApiMediaType>
                    {
                        ["multipart/form-data"] = new OpenApiMediaType
                        {
                            Schema = new OpenApiSchema
                            {
                                Type = "object",
                                Properties = new Dictionary<string, OpenApiSchema>
                                {
                                    ["file"] = new OpenApiSchema
                                    {
                                        Type = "string",
                                        Format = "binary"
                                    }
                                }
                            }
                        }
                    }
                };
            }
        }
    }
}
