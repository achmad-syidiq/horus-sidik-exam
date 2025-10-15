"""
Validators utility module.

Berisi fungsi-fungsi untuk validasi input data pengguna, seperti email, username, dan password.
Semua fungsi mengembalikan boolean True jika valid, False jika tidak.
"""

import re


def is_valid_email(email: str) -> bool:
    """
    Validasi format email.

    Args:
        email (str): Alamat email yang akan divalidasi.

    Returns:
        bool: True jika email valid, False jika tidak.
    """
    if not email:
        return False
    # Regex sederhana untuk email
    pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    return re.match(pattern, email) is not None


def is_valid_username(username: str) -> bool:
    """
    Validasi username.

    Rules:
        - Hanya huruf, angka, underscore
        - Panjang 3-50 karakter

    Args:
        username (str): Username yang akan divalidasi.

    Returns:
        bool: True jika valid, False jika tidak.
    """
    if not username:
        return False
    pattern = r"^[a-zA-Z0-9_]{3,50}$"
    return re.match(pattern, username) is not None


def is_strong_password(password: str) -> bool:
    """
    Validasi kekuatan password.

    Rules:
        - Minimal 8 karakter
        - Minimal 1 huruf besar
        - Minimal 1 huruf kecil
        - Minimal 1 angka
        - Minimal 1 simbol khusus

    Args:
        password (str): Password yang akan divalidasi.

    Returns:
        bool: True jika password kuat, False jika tidak.
    """
    if not password or len(password) < 8:
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"[0-9]", password):
        return False
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return False
    return True


def is_non_empty_string(value: str) -> bool:
    """
    Validasi apakah string tidak kosong.

    Args:
        value (str): String yang akan divalidasi.

    Returns:
        bool: True jika string tidak kosong, False jika kosong atau hanya spasi.
    """
    return bool(value and value.strip())


# Optional: fungsi helper untuk semua validasi user input
def validate_user_input(username: str, email: str, password: str, nama: str) -> dict:
    """
    Validasi semua input user sekaligus.

    Args:
        username (str)
        email (str)
        password (str)
        nama (str)

    Returns:
        dict: {
            "username": bool,
            "email": bool,
            "password": bool,
            "nama": bool
        }
    """
    return {
        "username": is_valid_username(username),
        "email": is_valid_email(email),
        "password": is_strong_password(password),
        "nama": is_non_empty_string(nama)
    }
