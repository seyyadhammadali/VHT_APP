import os
import shutil
import stat

def remove_readonly(func, path, _):
    os.chmod(path, stat.S_IWRITE)  # Change file to writeable
    func(path)

dir_path = r"C:\Users\Devoloper\Desktop\nativapps\virikson_holidays\VHT_APP"
shutil.rmtree(dir_path, onerror=remove_readonly)
print("Directory deleted successfully!")
