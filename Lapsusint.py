import tkinter as tk
from tkinter import messagebox
import random
from PIL import Image, ImageTk, ImageDraw, ImageFont
import os

class MatrixApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Lapsu$Int")
        self.root.geometry("1000x700")
        self.root.configure(bg='black')
        
        # Configuración del efecto Matrix
        self.font_size = 12
        self.columns = 1000 // self.font_size
        self.drops = [random.randint(-700, 0) for _ in range(self.columns)]
        self.characters = "01"  # Solo caracteres binarios
        self.char_color = "#00FF88"
        self.min_speed = 1.2
        self.max_speed = 2.5
        
        # Canvas principal
        self.canvas = tk.Canvas(root, width=1000, height=700, bg='black', highlightthickness=0)
        self.canvas.pack()
        
        # Elementos UI
        self.create_logo()
        self.create_panel()
        
        # Frame para controles
        self.main_frame = tk.Frame(root, bg='#001111')
        self.canvas.create_window(500, 350, window=self.main_frame, anchor="center")
        
        # Variables de formulario
        self.username = tk.StringVar()
        self.password = tk.StringVar()
        self.key = tk.StringVar()
        self.key.trace_add('write', self.limit_key_length)
        
        self.show_main_screen()
        self.animate()

    def limit_key_length(self, *args):
        """Limita la clave a 22 caracteres exactos"""
        if len(self.key.get()) > 22:
            self.key.set(self.key.get()[:22])

    def create_logo(self):
        """Logo con efecto neon mejorado"""
        try:
            font = ImageFont.truetype("consola.ttf", 60) if os.name == 'nt' else ImageFont.load_default()
        except:
            font = ImageFont.load_default()
        
        logo_img = Image.new('RGBA', (600, 120), (0, 0, 0, 0))
        draw = ImageDraw.Draw(logo_img)
        
        # Efecto de resplandor simple
        for offset in [3, 2, 1]:
            draw.text((30 + offset, 30 + offset), "Lapsu$Int", 
                     fill=(0, 100, 70, 50), font=font)
        
        draw.text((30, 30), "Lapsu$Int", fill=self.char_color, font=font)
        
        self.logo_img = ImageTk.PhotoImage(logo_img)
        self.logo = self.canvas.create_image(500, 100, image=self.logo_img)

    def create_panel(self):
        """Panel semitransparente optimizado"""
        panel_img = Image.new('RGBA', (500, 400), (0, 15, 10, 180))
        draw = ImageDraw.Draw(panel_img)
        draw.rectangle([5, 5, 495, 395], outline=(0, 120, 80), width=2)
        
        self.panel_img = ImageTk.PhotoImage(panel_img)
        self.panel = self.canvas.create_image(500, 350, image=self.panel_img)

    def animate(self):
        """Efecto Matrix completo y optimizado"""
        # Capa de desvanecimiento
        self.canvas.create_rectangle(0, 0, 1000, 700, fill='black', outline='', stipple='gray12')
        
        # Dibujar caracteres cayendo
        for i in range(len(self.drops)):
            if self.drops[i] > 0:
                # Variación de intensidad vertical
                intensity = min(255, 100 + int(155 * (1 - (self.drops[i] * self.font_size)/700)))
                color = f"#00{format(intensity, '02x')}88"
                
                self.canvas.create_text(
                    (i % self.columns) * self.font_size,
                    self.drops[i] * self.font_size,
                    text=random.choice(self.characters),
                    fill=color,
                    font=('Consolas', self.font_size),
                    anchor='nw'
                )
            
            # Movimiento con velocidad aleatoria
            self.drops[i] += random.uniform(self.min_speed, self.max_speed)
            
            # Reiniciar gotas que salen de pantalla
            if self.drops[i] * self.font_size > 700 * 1.5:
                self.drops[i] = random.randint(-200, 0)
                
        # Auto-ajuste de densidad dinámica
        if random.random() < 0.1 and len(self.drops) < self.columns * 1.5:
            self.drops.append(random.randint(-700, 0))
            
        # Control FPS (30-40 FPS)
        self.root.after(25, self.animate)

    def show_main_screen(self):
        """Pantalla principal con botones"""
        self.clear_frame()
        
        btn_style = {
            'bg': '#002222',
            'fg': self.char_color,
            'font': ('Courier', 14, 'bold'),
            'width': 20,
            'height': 2,
            'bd': 0,
            'activebackground': '#005555',
            'activeforeground': '#00FFCC'
        }
        
        tk.Label(self.main_frame, text="", bg='#001111').pack(pady=20)
        tk.Button(self.main_frame, text="INICIAR SESIÓN", command=self.show_login, **btn_style).pack(pady=15, padx=50)
        tk.Button(self.main_frame, text="REGISTRARSE", command=self.show_register, **btn_style).pack(pady=15, padx=50)

    def show_login(self):
        """Interfaz de login"""
        self.clear_frame()
        
        lbl_style = {'bg': '#001111', 'fg': self.char_color, 'font': ('Courier', 12)}
        entry_style = {
            'bg': '#003333',
            'fg': 'white',
            'insertbackground': 'white',
            'font': ('Courier', 12),
            'width': 30
        }
        
        tk.Label(self.main_frame, text="\nINICIAR SESIÓN\n", **lbl_style).pack()
        
        tk.Label(self.main_frame, text="USUARIO:", **lbl_style).pack(pady=5)
        tk.Entry(self.main_frame, textvariable=self.username, **entry_style).pack(pady=5)
        
        tk.Label(self.main_frame, text="CONTRASEÑA:", **lbl_style).pack(pady=5)
        tk.Entry(self.main_frame, textvariable=self.password, show="*", **entry_style).pack(pady=5)
        
        self.create_action_buttons("INGRESAR", self.validate_login)

    def show_register(self):
        """Interfaz de registro con validación de clave"""
        self.clear_frame()
        
        lbl_style = {'bg': '#001111', 'fg': self.char_color, 'font': ('Courier', 12)}
        entry_style = {
            'bg': '#003333',
            'fg': 'white',
            'insertbackground': 'white',
            'font': ('Courier', 12),
            'width': 30
        }
        
        tk.Label(self.main_frame, text="\nREGISTRO\n", **lbl_style).pack()
        
        tk.Label(self.main_frame, text="USUARIO:", **lbl_style).pack(pady=5)
        tk.Entry(self.main_frame, textvariable=self.username, **entry_style).pack(pady=5)
        
        tk.Label(self.main_frame, text="CONTRASEÑA:", **lbl_style).pack(pady=5)
        tk.Entry(self.main_frame, textvariable=self.password, show="*", **entry_style).pack(pady=5)
        
        tk.Label(self.main_frame, text="CLAVE (22 caracteres):", **lbl_style).pack(pady=5)
        
        # Entry con validación automática de longitud
        key_entry = tk.Entry(self.main_frame, textvariable=self.key, **entry_style)
        key_entry.pack(pady=5)
        
        tk.Label(self.main_frame, text="Debe incluir 'lapsusint'", bg='#001111', fg='#007755', font=('Courier', 9)).pack()
        
        self.create_action_buttons("REGISTRAR", self.validate_register)

    def create_action_buttons(self, action_text, action_command):
        """Botones inferiores con estilo consistente"""
        btn_frame = tk.Frame(self.main_frame, bg='#001111')
        btn_frame.pack(pady=20)
        
        btn_style = {
            'bg': '#003333',
            'fg': self.char_color,
            'font': ('Courier', 12, 'bold'),
            'width': 12,
            'height': 1,
            'bd': 0
        }
        
        tk.Button(btn_frame, text=action_text, command=action_command, **btn_style).pack(side='left', padx=10)
        tk.Button(btn_frame, text="VOLVER", command=self.show_main_screen, **btn_style).pack(side='right', padx=10)

    def clear_frame(self):
        """Limpia todos los widgets del frame"""
        for widget in self.main_frame.winfo_children():
            widget.destroy()

    def validate_login(self):
        """Validación de login"""
        user = self.username.get().strip()
        pwd = self.password.get().strip()
        
        if not user or not pwd:
            self.show_message("Error: Campos requeridos", "error")
        else:
            self.show_message("Acceso concedido", "success")

    def validate_register(self):
        """Validación de registro con clave"""
        key = self.key.get().lower()
        
        if len(key) != 22:
            self.show_message("Error: La clave debe tener\n22 caracteres exactos", "error")
            return
            
        if "lapsusint" not in key:
            self.show_message("Error: La clave debe contener\n'lapsusint'", "error")
            return
            
        self.show_message("Registro exitoso", "success")

    def show_message(self, msg, msg_type):
        """Muestra mensajes flotantes"""
        msg_color = "#00FF88" if msg_type == "success" else "#FF5555"
        msg_window = tk.Toplevel(self.root)
        msg_window.title("Mensaje")
        msg_window.geometry("400x150")
        msg_window.resizable(False, False)
        msg_window.configure(bg='#002222')
        
        # Centrar ventana
        x = self.root.winfo_x() + (self.root.winfo_width()//2 - 200)
        y = self.root.winfo_y() + (self.root.winfo_height()//2 - 75)
        msg_window.geometry(f"+{x}+{y}")
        
        tk.Label(msg_window, text=msg, bg='#002222', fg=msg_color,
                font=('Courier', 14), wraplength=380).pack(expand=True)
        
        btn_style = {
            'bg': '#004444',
            'fg': 'white',
            'font': ('Courier', 12),
            'width': 10
        }
        
        action = lambda: [msg_window.destroy(), self.show_main_screen()] if msg_type == "success" else msg_window.destroy
        tk.Button(msg_window, text="OK", command=action, **btn_style).pack(pady=10)

if __name__ == "__main__":
    try:
        root = tk.Tk()
        app = MatrixApp(root)
        root.mainloop()
    except Exception as e:
        import traceback
        traceback.print_exc()
        input("Presiona Enter para salir...")
